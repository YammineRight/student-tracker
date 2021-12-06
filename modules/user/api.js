import { Api } from "../../common/api";

export const userApi = {
  signup: (credentials) => {
    return Api.post("/auth/register", credentials);
  },

  login: (credentials) => {
    return Api.post("/auth/login", credentials);
  },
};
