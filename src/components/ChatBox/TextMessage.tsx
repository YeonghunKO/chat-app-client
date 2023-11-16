import { useUserStore } from "@/store";
import { IMessage } from "@/type";
import { formatAMPM } from "@/utils/calculateTime";

import Status from "./Status";

interface ITextMessage extends React.HTMLAttributes<HTMLDivElement> {
  message: IMessage;
}

const TextMessage = ({ message, ...rest }: ITextMessage) => {
  const currentChatUserId = useUserStore((set) => set.currentChatUser);
  return (
    <div
      id={`${message.id}`}
      className={`mb-[2px] flex flex-col gap-[2px] overflow-hidden rounded-[10px] ${
        currentChatUserId?.id === message.senderId
          ? "mr-[25px] self-start bg-incoming-background"
          : "ml-[25px] self-end bg-outgoing-background"
      }`}
      {...rest}
    >
      <span className="break-all px-[10px] pt-[10px] text-[15px]">
        {message.message}
      </span>
      <div className="flex gap-[2px] self-end px-[8px] py-[3px]">
        <span className="min-w-fit self-end text-[11px] text-bubble-meta">
          {formatAMPM(message.createdAt)}
        </span>
        {currentChatUserId?.id !== message.senderId && (
          <Status status={message.status} />
        )}
      </div>
    </div>
  );
};

export default TextMessage;
