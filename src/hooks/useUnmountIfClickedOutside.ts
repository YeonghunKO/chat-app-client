import { useEffect, RefObject, useCallback } from "react";

interface IUseUnmountIfClickedOutside {
  ref: RefObject<HTMLFormElement | HTMLDivElement> | undefined;
  callback: () => void;
}

export const useUnmountIfClickedOutside = ({
  ref,
  callback,
}: IUseUnmountIfClickedOutside) => {
  const handleClick = useCallback(
    (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (!ref) return;
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    // 이벤트가 capture 된 상태일때 실행됨
    // https://velog.io/@yhko1992/event-phase 참고
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [handleClick]);
};

export default useUnmountIfClickedOutside;
