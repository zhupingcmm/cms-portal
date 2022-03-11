import { useEffect } from 'react';
import { useState } from 'react';

const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...param: any) => {
        timer = setTimeout(() => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = fn(...param)
        }, delay);
    }
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(timer);
    },[delay, value]);

    return debounceValue;
}