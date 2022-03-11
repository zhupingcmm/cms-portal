import { useCallback } from 'react';
import { GET } from "@src/config";
import * as qs from "qs";
import { useAuth } from '@src/context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customerConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-type": data ? "application/json" : "",
    },
    ...customerConfig,
  };

  if (config.method.toUpperCase() === GET) {
    endpoint += `?${qs.stringify( data)}`;
  } else {
    config.body = JSON.stringify(data);
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  }).catch((e: Error) => {
    redirect('/');
  });
};

export const useHttp  = () => {
  const { user } = useAuth();
  return useCallback((...[endpoint, config]: Parameters<typeof http>) => {
    return http(endpoint, {...config, token: user?.token})
  }, [user?.token])
}

export const redirect = (contextPath: string) => {
  window.location.href = contextPath;
}
