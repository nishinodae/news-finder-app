import { useEffect, useRef } from 'react';

const useDebounced = (callback, delay) => {
    const timerRef = useRef();

    //cleanup on unmount
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const debounce = (...args) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => callback(...args), delay);
    };

    return debounce;
};

export default useDebounced;