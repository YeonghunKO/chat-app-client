import { useEffect } from "react";

export const useDebounce = (
  callback: Function,
  value: any,
  delay: number = 600,
) => {
  useEffect(() => {
    const id = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);
};
