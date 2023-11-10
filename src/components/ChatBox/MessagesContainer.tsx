import React from "react";
import { IMessage } from "@/type";

import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";

import TextMessage from "./TextMessage";

import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";

const AudioMessage = dynamic(() => import("../ChatBox/AudioMessage"), {
  ssr: false,
});

const MessagesContainer = () => {
  const { data: messages } = useGetCurrentMessagesQuery<IMessage[]>({
    suspense: true,
  });

  return (
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
  );
};

export default MessagesContainer;
