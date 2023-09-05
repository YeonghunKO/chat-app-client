import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import MessageBar from "./MessageBar";

const ChatBox = () => {
  return (
    <section className="z-10 flex h-[100vh] w-full flex-col border-l border-conversation-border bg-conversation-panel-background ">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </section>
  );
};

export default ChatBox;
