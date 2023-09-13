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
      className={`mb-[10px] flex gap-2 rounded-[10px] p-[10px] ${
        currentChatUserId?.id === message.senderId
          ? "self-start bg-incoming-background"
          : "self-end bg-outgoing-background"
      }`}
    >
      <span className="break-all text-[15px]">{message.message}</span>
      <span className="min-w-fit self-end text-[11px] text-bubble-meta">
        {calculateTime(message.createdAt)}
      </span>
      <Status status={message.status} />
    </div>
  );
};

export default TextMessage;
