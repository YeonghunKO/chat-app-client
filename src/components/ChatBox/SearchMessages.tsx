import { useGetCurrentMessagesQuery } from "@/hooks/useQueryAccount";
import { useSearchStore, useUserStore } from "@/store";
import { RefObject, useEffect, useState } from "react";
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
      <div className="custom-scrollbar h-[80dvh] overflow-auto p-[20px] pt-[0]">
        {searchedMessages.length ? (
          searchedMessages.map((message: IMessage) => {
            return (
              <div
                onClick={handleResultClick(message.id)}
                key={message.id}
                className="mb-[10px] cursor-pointer rounded-md p-[10px] hover:bg-incoming-background hover:text-teal-light"
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

export default SearchMessages;
