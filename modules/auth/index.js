import { useState, useEffect, useRef } from "react";
import { Api } from "../../../../common/api";
import { Validator } from "../../../../common/utils/validation";
import providers from "../../../../config/services";

export const useUserService = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState();
  // initial loading state is true to check for token in the local storage
  const [isLoading, setIsLoading] = useState(true);
  const unAuthInterceptor = useRef();
  const userApi =: {
    import { Api } from "../../common/api";

export const userApi = {
    signup: (credentials) => {
      return Api.post("signup", credentials);
    },

    login: (credentials) => {
      return Api.post("login", credentials);
    },
/*
    logout: () => {
      return Api.get("logout");
    },*/
  }

  useEffect(async () => {
    const token = getToken();

    if (token) {
      addTokenToApiHeader(token);
      getUser().catch();
    } else {
      unAuthenticate();
      setIsLoading(false);
    }
  }, []);

  const addTokenToApiHeader = (accessToken) => {
    Api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  const removeTokenFromApiHeader = () => {
    delete Api.defaults.headers.common["Authorization"];
  };

  const addUnAuthenticatedInterceptor = () => {
    if (unAuthInterceptor.current) return;

    unAuthInterceptor.current = Api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status == 401) {
          unAuthenticate();
          logout();
        }
        return Promise.reject(error);
      }
    );
  };

  const removeUnAuthenticatedInterceptor = () => {
    Api.interceptors.request.eject(unAuthInterceptor.current);
    unAuthInterceptor.current = null;
  };

  const saveToken = (accessToken) => {
    window.localStorage.setItem("token", accessToken);
  };

  const removeToken = () => {
    window.localStorage.removeItem("token");
  };

  const getToken = () => {
    const storedToken = window.localStorage.getItem("token");
    if (Validator.required(storedToken).success) {
      return storedToken;
    }
    return null;
  };

  const unAuthenticate = () => {
    removeUnAuthenticatedInterceptor();
    removeTokenFromApiHeader();
    removeToken();
    setIsAuthenticated(false);
    setUser({});
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated === true) {
        await userApi.logout();
        unAuthenticate();
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw "Something went wrong while loging out";
    }
  };

  const authenticateUsingApiCall = async (apiCall) => {
    setIsLoading(true);
    try {
      const { data } = await apiCall();

      setUser(() => ({
        username: data?.fullName || data?.name,
        email: data?.email,
      }));

      // saving the token in the local storage and adding it to the api header
      if (data?.accessToken) {
        saveToken(data.accessToken);
        addTokenToApiHeader(data.accessToken);
      }

      // adding interceptor to logout on unauthenticated responses
      addUnAuthenticatedInterceptor();

      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (err) {
      const { errors, message } = err.response?.data;
      unAuthenticate();
      setIsLoading(false);
      throw { ...errors, message };
    }
  };

  const signup = (form) => {
    return authenticateUsingApiCall(() => userApi.signup(form));
  };

  const login = (form) => {
    return authenticateUsingApiCall(() => userApi.login(form));
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signup,
    login,
  };
};
