import {useEffect} from 'react';

export function useDebounce<T>(callback: VoidFunction, value: T, ms: number) {
    useEffect(() => {
        const timer = setTimeout(callback, ms);
        return () => clearTimeout(timer);
    }, [value, ms]);
}
