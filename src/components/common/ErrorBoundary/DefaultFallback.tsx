import React from "react";
import { ErrorFallbackProps } from "./type";

type DefaultFallbackProps = Omit<ErrorFallbackProps, "onRetry">;

const DefaultFallback = ({ err }: DefaultFallbackProps) => {
  return (
    <div>
      {err?.message}
      <p>
        문제 발생요 ㅋㅋㅋ 다시 시도해주세유
        하하하하하하하하하하하하하하하하하하하하하하
      </p>
    </div>
  );
};

export default DefaultFallback;
