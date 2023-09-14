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
      className={`mb-[2px] flex flex-col gap-[2px] overflow-hidden rounded-[10px]  pl-[10px]  pt-[10px] ${
        currentChatUserId?.id === message.senderId
          ? "mr-[25px] self-start bg-incoming-background pb-[5px] pr-[7px]"
          : "ml-[25px] self-end bg-outgoing-background pb-[5px] pr-[5px]"
      }`}
    >
      <span className="break-all text-[15px]">{message.message}</span>
      <div className="flex gap-[2px] self-end">
        <span className="min-w-fit self-end text-[9px] text-bubble-meta">
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