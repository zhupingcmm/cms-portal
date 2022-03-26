import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((pre, key) => {
          return { ...pre, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (param: Partial<{ [key in K]: unknown }>) => {
      const o = {
        ...Object.fromEntries(searchParams),
        ...param,
      } as URLSearchParamsInit;
      setSearchParams(o);
    },
  ] as const;
};
