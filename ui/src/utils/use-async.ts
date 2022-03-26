import { CustomerError } from "@src/types";
import { useState, useCallback } from "react";

interface State<D> {
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
  error: CustomerError | null;
}

const defaultInitState: State<null> = {
  data: null,
  stat: "idle",
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const initialState = {
    ...defaultInitState,
    ...initState,
  };
  const [state, setState] = useState<State<D>>(initialState);
  const [retry, setRetry] = useState(() => () => {});

  const setError = useCallback(
    (e: CustomerError) => {
      setState({
        data: null,
        stat: "error",
        error: e,
      });
    },
    [setState]
  );

  const setData = useCallback(
    (data: D) => {
      setState({
        data,
        stat: "success",
        error: null,
      });
    },
    [useState]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("please input promise!!!");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });

      setState({ ...state, stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((e) => {
          setError(e);
          if (config.throwOnError) return Promise.reject(e);
          return e;
        });
    },
    [state, setData, setError, setState]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
