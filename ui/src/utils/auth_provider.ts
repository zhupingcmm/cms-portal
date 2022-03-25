import { http } from "@src/utils/http";
import { LOCAL_STORAGE_KEY } from "@src/config";
import { AuthForm } from "@src/context/auth-context";
import { User } from "@src/types";

export const isEmpty = (item: object): boolean => {
  return !Object.keys(item).length;
};
export const setToken = (token: string) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const getToken = () => {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
};

export const removeToken = () =>
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);

export const handleResponse = (data: User) => {
  setToken(data?.token || "");
  return data;
};

export const login = (authForm: AuthForm) => {
  return http("token", { method: "POST", data: authForm })
    .then(async (res) => {
      return handleResponse(res);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const register = (authForm: AuthForm) => {
  return http("user", { method: "POST", data: authForm })
    .then(async (res) => {
      return handleResponse(res);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const logout = async () => removeToken();
