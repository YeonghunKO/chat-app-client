import { useUserStore } from "@/store";
import { IMessage } from "@/type";
import { calculateTime } from "@/utils/calculateTime";
import React from "react";
import Status from "./Status";

const TextMessage = ({ message }: { message: IMessage }) => {
  const currentChatUserId = useUserStore((set) => set.currentChatUser);

  return (
    <div
      key={message.id}
      className={`relative mb-[2px] flex gap-[2px] overflow-hidden rounded-[10px] p-[10px] ${
        currentChatUserId?.id === message.senderId
          ? "mr-[25px] self-start bg-incoming-background"
          : "ml-[25px] self-end bg-outgoing-background"
      }`}
    >
      <span className="break-all text-[15px]">{message.message}</span>
      <div className="absolute flex">
        <span className="min-w-fit self-end text-[11px] text-bubble-meta">
          {calculateTime(message.createdAt)}
        </span>
        {currentChatUserId?.id !== message.senderId && (
          <Status status={message.status} />
        )}
      </div>
    </div>
  );
};

export default TextMessage;
