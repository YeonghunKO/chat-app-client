import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";
import { useUserStore } from "@/store";
import { IMessage } from "@/type";
import { calculateTime } from "@/utils/calculateTime";
import { useEffect, useRef } from "react";

const ChatContainer = () => {
  const $messageEnd = useRef<HTMLDivElement>(null);

  const { data: messages } = useGetCurrentMessagesQuery<IMessage[]>({});

  const currentChatUserId = useUserStore((set) => set.currentChatUser);

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
              return (
                <div
                  key={message.id}
                  className={`flex ${
                    currentChatUserId?.id === message.senderId
                      ? "self-start"
                      : "self-end"
                  }`}
                >
                  <span>{message.message}</span>
                  <span>{calculateTime(message.createdAt)}</span>
                  <span></span>
                </div>
              );
            })}
          </div>
          <div ref={$messageEnd}></div>
        </section>
      </div>
    </div>
  );
};

export default ChatContainer;
{
  /* <div
key={index}
className={`flex ${
  message.senderId === currentChatUser.id
    ? "justify-start"
    : "justify-end"
}`}
>
{message.type === "text" && (
  <div
    className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%]	 ${
      message.senderId === currentChatUser.id
        ? "bg-incoming-background"
        : "bg-outgoing-background"
    }`}
  >
    <span className="break-all">{message.message}</span>
    <div className="flex gap-1 items-end">
      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
        {calculateTime(message.createdAt)}
      </span>
      <span>
        {message.senderId === userInfo.id && (
          <MessageStatus
            messageStatus={message.messageStatus}
          />
        )}
      </span>
    </div>
  </div>
)}
{message.type === "image" && <ImageMessage message={message} />}
{message.type === "audio" && <VoiceMessage message={message} />}
</div> */
}
