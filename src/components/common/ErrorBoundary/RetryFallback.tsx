import React from "react";
import { ErrorFallbackProps } from "./type";
import { useRouter } from "next/router";
import { SIGN_IN_PAGE } from "@/constant/path";

const RetryFallback = ({ err, onRetry }: ErrorFallbackProps) => {
  const router = useRouter();

  const handleReturnLoginPage = () => {
    router.push(SIGN_IN_PAGE);
    // location.reload();
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <span className="text-[5vw]">죄송합니다. 문제가 발생했어요.</span>
      <span className="text-[3vw]">
        에러 메세지: {err.message ? err.message : err}
      </span>
      <div className="flex gap-[10px]">
        {/* <button
          className="h-full w-full rounded-[10px] bg-outgoing-background p-[5px] text-[4vw]"
          onClick={handleReturnLoginPage}
        >
          {"로그인 \n 화면으로 가기"}
        </button> */}
        <button
          className="h-full w-full rounded-[10px] bg-outgoing-background p-[5px] text-[4vw]"
          onClick={onRetry}
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
};

export default RetryFallback;
