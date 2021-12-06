import { useState, useEffect, useRef } from "react";
import { userApi } from "../../api";
import { Api } from "../../../../common/api";
import { Validator } from "../../../../common/util/validation";

export const useUserService = () => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState();
  // initial loading state is true to check for token in the local storage
  const [isLoading, setIsLoading] = useState(false);
  const unAuthInterceptor = useRef();

  // gets fired when the app is mounted
  // authenticates user if a token is available
  useEffect(() => {
    unAuthenticate();
  }, []);

  const addTokenToApiHeader = (accessToken) => {
    Api.defaults.headers.common["x-access-token"] = `${accessToken}`;
  };

  const removeTokenFromApiHeader = () => {
    delete Api.defaults.headers.common["x-access-token"];
  };

  const addUnAuthenticatedInterceptor = () => {
    if (unAuthInterceptor.current) return;

    unAuthInterceptor.current = Api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status == 401) {
          unAuthenticate();
        }
        return Promise.reject(error);
      }
    );
  };

  const removeUnAuthenticatedInterceptor = () => {
    Api.interceptors.response.eject(unAuthInterceptor.current);
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
        unAuthenticate();
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw "Something went wrong while loging out";
    }
  };

  const authenticateUsingApiCall = async (
    apiCall,
    unAuthenticateOnFail = false
  ) => {
    setIsLoading(true);
    try {
      const { data } = await apiCall();

      setUser(() => ({
        username: data?.username,
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
      if (unAuthenticateOnFail) unAuthenticate();
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
    logout,
  };
};
