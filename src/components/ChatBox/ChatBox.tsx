// components
import { Suspense, forwardRef, memo } from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import MessageBar from "./MessageBar";
import Loading from "../common/Loading";

const ChatBox = forwardRef<HTMLDivElement, {}>(function ChatBox(props, ref) {
  return (
    <div
      ref={ref}
      className="z-10 flex h-[100vh] w-full flex-col border-l border-conversation-border bg-conversation-panel-background "
    >
      <ChatHeader />
      <Suspense
        fallback={
          <div className="flex h-[80dvh] w-full">
            <Loading />
          </div>
        }
      >
        <ChatContainer />
      </Suspense>
      <MessageBar />
    </div>
  );
});

export default memo(ChatBox);
