import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex h-full w-full animate-spinning items-center justify-center">
      <AiOutlineLoading3Quarters className="h-[30px] w-[30px]" />
    </div>
  );
};

export default Loading;
