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
  const { data: messagesWithDate } = useGetCurrentMessagesQuery<
    [string, IMessage[]][]
  >({
    suspense: true,
  });

  return (
    <section className="w-full">
      {messagesWithDate?.map((messagesInfo) => {
        const [date, messages] = messagesInfo;
        return (
          <div
            key={date}
            className="chat_container flex w-full flex-col gap-1 "
          >
            <div className="sticky top-0 z-[999] justify-center self-center">
              {date}
            </div>
            {messages.map((message: IMessage) => {
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
        );
      })}
    </section>
  );
};

export default MessagesContainer;
