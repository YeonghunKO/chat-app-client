import { useUserStore } from "@/store";
import { IMessage } from "@/type";
import { calculateTime } from "@/utils/calculateTime";
import React from "react";
import Status from "./Status";
import Image from "next/image";

const ImageMessage = ({ message }: { message: IMessage }) => {
  const currentChatUserId = useUserStore((set) => set.currentChatUser);

  return (
    <div
      key={message.id}
      className={`relative mb-[2px] flex flex-col gap-[2px] overflow-hidden rounded-[10px] ${
        currentChatUserId?.id === message.senderId
          ? "mr-[25px] self-start bg-incoming-background"
          : "ml-[25px] self-end bg-outgoing-background"
      }`}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${message.message}`}
        alt={message.message}
        width={250}
        height={250}
        className=""
      />
      <div className="absolute bottom-0 right-[-5px] flex gap-[2px] self-end rounded-tl-[16px] bg-[#5a5a5a9e] px-[8px] py-[5px]">
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

export default ImageMessage;