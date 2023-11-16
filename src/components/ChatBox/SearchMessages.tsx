import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";
import { useSearchStore, useUserStore } from "@/store";
import { RefObject, memo, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Input from "../common/Input";
import { IMessage } from "@/type";
import TextMessage from "./TextMessage";

const SearchMessages = ({ parent }: { parent: RefObject<HTMLElement> }) => {
  const toggleSearching = useSearchStore((set) => set.toggleIsSearchingMessage);

  const handleCloseSearching = () => {
    toggleSearching();
  };
  const currentChatUser = useUserStore((set) => set.currentChatUser);

  const [searchedMessages, setSearchedMessages] = useState<
    (never[] | readonly [string, IMessage[]])[]
  >([]);
  const [searchingKeyWord, setSearchingKeyWord] = useState("");

  const { data: allMessages } =
    useGetCurrentMessagesQuery<[string, IMessage[]][]>();

  useEffect(() => {
    if (allMessages) {
      if (searchingKeyWord) {
        const filteredMessages = allMessages.map((messageInfo) => {
          const [date, messages] = messageInfo;
          const filteredMessages = messages.filter((message) => {
            const isMatchedMessage =
              message.message?.includes(searchingKeyWord);
            if (message.type === "text" && isMatchedMessage) {
              return true;
            }

            return false;
          });

          if (filteredMessages.length) {
            return [date, filteredMessages] as const;
          }

          return [];
        });
        setSearchedMessages(filteredMessages);
      } else {
        setSearchedMessages([]);
      }
    }
  }, [searchingKeyWord, allMessages]);

  const handleResultClick = (messageId: number, date: string) => () => {
    if (parent.current) {
      const $chatBoxes = parent.current?.querySelector(
        `.chat_container_${date}`,
      );
      if ($chatBoxes) {
        const $childForMessageId = Array.from($chatBoxes.children).find(
          (child) => child.id === String(messageId),
        );

        // move scroll to the childNode
        if ($childForMessageId) {
          $childForMessageId.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });

          $childForMessageId.classList.add("animate-shake-bottom");
          // 모바일일경우 활성화하기
          // toggleSearching();
          setTimeout(() => {
            $childForMessageId.classList.remove("animate-shake-bottom");
          }, 2000);
        }
      }
    }
  };

  return (
    <div className="z-10 w-full  bg-search-input-container-background">
      <header className="flex h-[57px] gap-[10px] bg-panel-header-background pl-[10px] pt-[18px]">
        <IoClose
          className="cursor-pointer text-2xl text-icon-lighter"
          onClick={handleCloseSearching}
        />
        <p>Search Messages</p>
      </header>
      <div className="p-[10px]">
        <Input
          value={searchingKeyWord}
          setValue={setSearchingKeyWord}
          placeholder="searching messages"
        />
      </div>
      <div className="flex h-[80dvh] flex-col overflow-auto p-[20px] pt-[0]">
        {searchedMessages.length ? (
          searchedMessages.map((messageInfo) => {
            const [date, messages] = messageInfo;
            return (
              <>
                {date ? (
                  <div key={date} className="flex w-full flex-col gap-1">
                    <div className="sticky top-2 z-[999] mb-4 justify-center self-center rounded-lg bg-incoming-background px-4 py-2">
                      {date}
                    </div>
                    {messages?.map((message) => {
                      return (
                        <div className="flex w-full cursor-pointer flex-col transition-opacity hover:opacity-80">
                          <TextMessage
                            message={message}
                            onClick={handleResultClick(message.id, date)}
                            key={message.id}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </>
            );
          })
        ) : (
          <p className="mt-[40px] text-center text-panel-header-icon">
            Search Messages with {currentChatUser?.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(SearchMessages);
