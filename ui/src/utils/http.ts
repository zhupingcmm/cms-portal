import { GET } from "@src/config";
import * as qs from "qs";

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
    endpoint += `?${qs.stringify(data)}`;
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
    console.error(e);
    redirect('/abc');
  });
};

export const redirect = (contextPath: string) => {
  const href = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + contextPath;
  let location: Location = new Location();
  location.href = href;
  window.location = location;
  // window.location = location;
}
