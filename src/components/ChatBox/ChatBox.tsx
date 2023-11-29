// components
import { forwardRef, memo } from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import MessageBar from "./MessageBar";

const ChatBox = forwardRef<HTMLDivElement, {}>(function ChatBox(props, ref) {
  return (
    <div
      ref={ref}
      className="flex h-[100vh] w-full flex-col border-l border-conversation-border bg-conversation-panel-background "
    >
      <div className="fixed left-0 top-0 h-full w-full bg-chat-background opacity-[0.2]"></div>
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
});

export default ChatBox;
