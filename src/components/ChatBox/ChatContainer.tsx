import { Suspense } from "react";
import MessagesContainer from "./MessagesContainer";
import Loading from "../common/Loading";

const ChatContainer = () => {
  return (
    <div className="custom-scrollbar flex h-[80dvh] w-full flex-grow flex-col-reverse overflow-auto ">
      <div className="relative m-[10px] h-auto md:m-[30px]">
        <Suspense
          fallback={
            <div className="absolute -top-[40dvh] left-1/2">
              <Loading />
            </div>
          }
        >
          <MessagesContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default ChatContainer;
