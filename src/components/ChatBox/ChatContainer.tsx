import dynamic from "next/dynamic";
import { IMessage } from "@/type";

import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";
import TextMessage from "./TextMessage";

import ImageMessage from "./ImageMessage";

const AudioMessage = dynamic(() => import("../ChatBox/AudioMessage"), {
  ssr: false,
});

const ChatContainer = () => {
  const { data: messages } = useGetCurrentMessagesQuery<IMessage[]>({});

  return (
    <div className="custom-scrollbar flex h-[80dvh] w-full flex-grow flex-col-reverse overflow-auto ">
      <div className="fixed left-0 top-0 z-0 h-full w-full bg-chat-background bg-fixed opacity-5"></div>
      <div className="relative mx-10 my-6 ">
        <section className="w-full">
          <div className="chat_container flex w-full flex-col gap-1 overflow-hidden">
            {messages?.map((message) => {
              switch (message.type) {
                case "text":
                  return <TextMessage message={message} key={message.id} />;
                case "image":
                  return <ImageMessage message={message} key={message.id} />;
                case "audio":
                  return <AudioMessage message={message} key={message.id} />;

                default:
                  return;
              }
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatContainer;
