import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";
import { useSearchStore, useUserStore } from "@/store";
import { RefObject, memo, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Input from "../common/Input";
import { IMessage } from "@/type";
import { calculateTime } from "@/utils/calculateTime";

const SearchMessages = ({ parent }: { parent: RefObject<HTMLElement> }) => {
  const toggleSearching = useSearchStore((set) => set.toggleIsSearchingMessage);

  const handleCloseSearching = () => {
    toggleSearching();
  };
  const currentChatUser = useUserStore((set) => set.currentChatUser);

  const [searchedMessages, setSearchedMessages] = useState<IMessage[]>([]);
  const [searchingKeyWord, setSearchingKeyWord] = useState("");

  const { data: allMessages } = useGetCurrentMessagesQuery<IMessage[]>();

  useEffect(() => {
    if (allMessages) {
      if (searchingKeyWord) {
        const filteredMessages = allMessages.filter(
          (message) =>
            message.type === "text" &&
            message.message.includes(searchingKeyWord),
        );
        setSearchedMessages(filteredMessages);
      } else {
        setSearchedMessages([]);
      }
    }
  }, [searchingKeyWord, allMessages]);

  const handleResultClick = (messageId: number) => () => {
    if (parent.current) {
      const $chatBoxes = parent.current?.querySelector(".chat_container");

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
          }, 3000);
        }
      }
    }
  };

  return (
    <section className="z-10 w-full  bg-search-input-container-background">
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
      <div className="custom-scrollbar flex h-[80dvh] flex-col overflow-auto p-[20px] pt-[0]">
        {searchedMessages.length ? (
          searchedMessages.map((message: IMessage) => {
            return (
              <div
                onClick={handleResultClick(message.id)}
                key={message.id}
                className={`${
                  message.senderId === currentChatUser?.id
                    ? "self-start bg-incoming-background"
                    : "self-end bg-outgoing-background"
                } mb-[10px] w-[90%] cursor-pointer rounded-md p-[10px] transition-opacity hover:opacity-80`}
              >
                <p className="text-panel-header-icon">
                  {calculateTime(message.createdAt)}
                </p>
                <p>{message.message}</p>
              </div>
            );
          })
        ) : (
          <p className="mt-[40px] text-center text-panel-header-icon">
            Search Messages with {currentChatUser?.name}
          </p>
        )}
      </div>
    </section>
  );
};

export default memo(SearchMessages);
