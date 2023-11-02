import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="animate-spinning absolute -top-[45%] left-1/2 flex h-full items-center justify-center">
      <AiOutlineLoading3Quarters className="h-[30px] w-[30px]" />
    </div>
  );
};

export default Loading;
