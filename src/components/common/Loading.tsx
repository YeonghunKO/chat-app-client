import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="absolute -top-[45%] left-1/2 z-[999] flex h-full animate-spinning items-center justify-center">
      <AiOutlineLoading3Quarters className="h-[30px] w-[30px]" />
    </div>
  );
};

export default Loading;
