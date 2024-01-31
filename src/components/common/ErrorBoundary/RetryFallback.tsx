import { ErrorFallbackProps } from "./type";
import { SIGN_IN_PAGE } from "@/constant/path";

const RetryFallback = ({ err, onRetry }: ErrorFallbackProps) => {
  const handleReturnLoginPage = () => {
    window.history.replaceState(
      { ...window.history.state, as: SIGN_IN_PAGE, url: SIGN_IN_PAGE },
      "",
      SIGN_IN_PAGE,
    );
    location.reload();
  };
  return (
    <div className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-3">
      <span className="text-[5vw]">죄송합니다. 문제가 발생했어요.</span>
      <span className="text-[3vw]">
        에러 메세지: {err.message ? err.message : err}
      </span>
      <div className="flex gap-[10px]">
        <button
          className="h-full w-fit rounded-[10px] bg-outgoing-background p-[15px] text-[4vw]"
          onClick={handleReturnLoginPage}
        >
          로그인 화면으로
        </button>
        <button
          className="h-full w-fit rounded-[10px] bg-outgoing-background p-[15px] text-[4vw]"
          onClick={onRetry}
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
};

export default RetryFallback;
