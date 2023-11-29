import Image from "next/image";

import { useLocalStorage } from "@/store";
import type { ILocalStorage, IMessage } from "@/type";
import { formatAMPM } from "@/utils/calculateTime";

import Status from "./Status";
import Loading from "../common/Loading";
import { useStore } from "@/hooks/useStore";

const ImageMessage = ({ message }: { message: IMessage }) => {
  const currentChatUser = useStore(
    useLocalStorage,
    (state: ILocalStorage) => state.currentChatUser,
  );

  return (
    <div
      id={`${message.id}`}
      key={message.id}
      className={`relative mb-[2px] flex flex-col gap-[2px] overflow-hidden rounded-[10px] ${
        currentChatUser?.id === message.senderId
          ? "mr-[25px] self-start bg-incoming-background"
          : "ml-[25px] self-end bg-outgoing-background"
      }`}
    >
      {message.message ? (
        <>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${message.message}`}
            alt={message.message}
            width={250}
            height={250}
            style={{ width: 250, height: 250 }}
          />

          <div className="absolute bottom-0 right-[-5px] flex gap-[2px] self-end rounded-tl-[16px] bg-[#5a5a5a9e] px-[8px] py-[5px]">
            <span className="min-w-fit self-end text-[11px] text-bubble-meta">
              {formatAMPM(message.createdAt)}
            </span>
            {currentChatUser?.id !== message.senderId && (
              <Status status={message.status} />
            )}
          </div>
        </>
      ) : (
        <div className="h-[100px] w-[200px]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ImageMessage;
