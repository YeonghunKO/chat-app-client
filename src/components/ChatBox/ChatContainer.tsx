import { Suspense } from "react";
import MessagesContainer from "./MessagesContainer";
import Loading from "../common/Loading";

const ChatContainer = () => {
  return (
    <div className="custom-scrollbar flex h-[80dvh] w-full flex-grow flex-col-reverse overflow-auto ">
      <div className="fixed left-0 top-0 z-0 h-full w-full bg-chat-background bg-fixed opacity-5"></div>
      <div className="relative mx-10 my-6 ">
        <Suspense
          fallback={
            <div className="h-[60dvh]">
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
