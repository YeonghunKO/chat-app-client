import { useEffect, useRef } from "react";

interface IUseInterval {
  callback: () => void;
  delay?: number;
  isStop?: boolean;
}

export const useInterval = ({
  callback,
  delay = 300,
  isStop = false,
}: IUseInterval) => {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    let id: any;

    if (isStop) {
      clearInterval(id);
    } else {
      id = setInterval(tick, delay);
    }

    return () => clearInterval(id);
  }, [delay, isStop]);
};
