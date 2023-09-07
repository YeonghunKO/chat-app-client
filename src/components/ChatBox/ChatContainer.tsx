import { GET_MESSAGES } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { useGetMessagesQueryForChat } from "@/hooks/useQueryAccount";
import { getFetch } from "@/lib/api";
import { useRef } from "react";
import { useQuery, useQueryClient } from "react-query";

const ChatContainer = () => {
  const containerRef = useRef(null);

  const data = useGetMessagesQueryForChat();
  console.log("data", data);

  // const { data } = useQuery(queryKeys.messages, () =>
  //   getFetch({
  //     url: GET_MESSAGES(),
  //   }),
  // );

  return (
    <div
      className="custom-scrollbar relative h-[80vh] w-full flex-grow overflow-auto "
      ref={containerRef}
    >
      <div className="fixed left-0 top-0 z-0 h-full w-full bg-chat-background bg-fixed opacity-5"></div>
      <div className="relative bottom-0 left-0 z-40 mx-10 my-6 ">
        <div className="flex w-full">
          <div className="flex w-full flex-col justify-end gap-1 overflow-auto">
            <p>
              {/* {data?.messages.map((message: string) => <span>{message}</span>)} */}
            </p>
            {/* {messages.map((message, index) => (
          <div
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
          </div>
        ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
