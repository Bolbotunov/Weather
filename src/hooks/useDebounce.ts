import { useEffect } from 'react';

export const useDebounce = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, delay);

    return () => clearTimeout(timer);
  }, [callback, delay]);
};
