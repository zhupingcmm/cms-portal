import { useState, useCallback } from "react";

interface State<D> {
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
  error: Error | null;
}

const defaultInitState: State<null> = {
  data: null,
  stat: "idle",
  error: null,
};

export const useAsync = <D>(initState?: State<D>) => {
  const initialState = {
    ...defaultInitState,
    ...initState,
  };
  const [state, setState] = useState<State<D>>(initialState);

  const setError = useCallback(
    (e: Error) => {
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
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error("please input promise!!!");
      }

      setState({ ...state, stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((e) => {
          setError(e);
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
    ...state,
  };
};
