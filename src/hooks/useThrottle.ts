import { useCallback, useRef } from "react";

interface IUseThrottle {
  callback: (arg: any) => void;
  interval?: number;
}

export const useThrottle = ({ callback, interval = 500 }: IUseThrottle) => {
  const lastArgs = useRef(null);
  const shouldWait = useRef(false);
  const timerId = useRef<NodeJS.Timeout>();

  const timeoutFunc = useCallback(() => {
    if (!lastArgs.current) {
      shouldWait.current = false;
    } else {
      // 3. 두번째 콜백 호출
      callback(lastArgs.current);
      lastArgs.current = null;
      // 4. 다음 interval에서 shouldWait 풀리면서 throttle밖에 있는 것이 몰려올것임.
      timerId.current = setTimeout(timeoutFunc, interval);
    }
  }, []);

  const throttle = useCallback(
    function (arg: any) {
      if (shouldWait.current) {
        // 0. 일단 lastArgs를 갱신
        lastArgs.current = arg;
        return;
      }

      // 1. 첫번째 콜백 호출
      callback(arg);

      // 1-1. throttle 잠그기.
      shouldWait.current = true;

      // 2. 두번째 콜백 예약(리턴문에서 막아줌)
      timerId.current = setTimeout(timeoutFunc, interval);
    },
    [callback, interval],
  );
  return [throttle];
};
