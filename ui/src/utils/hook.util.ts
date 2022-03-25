import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...param: any) => {
    timer = setTimeout(() => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = fn(...param);
    }, delay);
  };
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, value]);

  return debounceValue;
};

export const useArray = <T>(initialState: T[]) => {
  const [value, setValue] = useState(initialState);
  const add = useCallback(
    (v: T) => {
      const r = [...value];
      r.push(v);
      setValue(r);
    },
    [value, setValue]
  );
  const clear = useCallback(() => {
    setValue([]);
  }, []);
  const removeIndex = useCallback(
    (index: number) => {
      const r = [...value];
      r.splice(index, 1);
      setValue(r);
    },
    [value, setValue]
  );
  return {
    value,
    add,
    clear,
    removeIndex,
  };
};
