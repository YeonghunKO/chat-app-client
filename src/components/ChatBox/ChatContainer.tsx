import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";
import { IMessage } from "@/type";
import { useEffect, useRef } from "react";
import TextMessage from "./TextMessage";

const ChatContainer = () => {
  const $messageEnd = useRef<HTMLDivElement>(null);

  const { data: messages } = useGetCurrentMessagesQuery<IMessage[]>({});

  console.log("messages", messages);

  useEffect(() => {
    // $messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="custom-scrollbar relative h-[80vh] w-full flex-grow overflow-auto ">
      <div className="fixed left-0 top-0 z-0 h-full w-full bg-chat-background bg-fixed opacity-5"></div>
      <div className="relative bottom-0 left-0 z-40 mx-10 my-6 ">
        <section className="flex w-full">
          <div className="flex w-full flex-col justify-end gap-1 overflow-auto">
            {messages?.map((message) => {
              return <TextMessage message={message} key={message.id} />;
            })}
          </div>
          <div ref={$messageEnd}></div>
        </section>
      </div>
    </div>
  );
};

export default ChatContainer;
