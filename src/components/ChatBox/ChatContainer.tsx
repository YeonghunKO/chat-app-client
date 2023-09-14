import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";
import { IMessage } from "@/type";
import TextMessage from "./TextMessage";

const ChatContainer = () => {
  const { data: messages } = useGetCurrentMessagesQuery<IMessage[]>({});

  console.log("messages", messages);

  return (
    <div className="custom-scrollbar flex h-[80dvh] w-full flex-grow flex-col-reverse overflow-auto ">
      <div className="fixed left-0 top-0 z-0 h-full w-full bg-chat-background bg-fixed opacity-5"></div>
      <div className="relative mx-10 my-6 ">
        <section className="w-full">
          <div className="flex w-full flex-col gap-1 overflow-auto">
            {messages?.map((message) => {
              return <TextMessage message={message} key={message.id} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatContainer;
