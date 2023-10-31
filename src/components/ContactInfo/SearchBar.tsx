import { useState } from "react";
import { useQueryClient } from "react-query";
import { IMessage, IUserInfo } from "@/type";

import { useMutationQuery } from "@/hooks/useQueryAccount";
import { BiFilter, BiSearchAlt2 } from "react-icons/bi";
import Input from "../common/Input";

import { getFetch } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { queryKeys } from "@/constant/queryKeys";
import { FILTERED_MESSAGE } from "@/constant/api";
import { useSearchStore } from "@/store";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const client = useQueryClient();

  const { id } = client.getQueryData(queryKeys.userInfo) as IUserInfo;

  const { setFilteredChatList, setSearchingValue } = useSearchStore((set) => ({
    setFilteredChatList: set.setFilteredChatList,
    setSearchingValue: set.setAllMessageSearchValue,
  }));

  const { mutate } = useMutationQuery({
    queryKey: queryKeys.filteredMessages,
    mutationFunc: (message: string) =>
      getFetch({
        url: FILTERED_MESSAGE(id, message),
        mapper: (filteredMessages: IMessage[]) => {
          const parsedChatListId = filteredMessages.reduce((acc, message) => {
            const otherUserId =
              message.senderId === id ? message.recieverId : message.senderId;
            acc.add(otherUserId);
            return acc;
          }, new Set());

          return Array.from(parsedChatListId);
        },
      }),
    onSuccess: (data: number[]) => {
      setFilteredChatList(data);
    },
  });

  useDebounce(() => {
    if (value.length) {
      mutate(value);
    }
    setSearchingValue(value);
  }, value);

  return (
    <div className="flex h-14 items-center gap-3 bg-search-input-container-background py-3 pl-3">
      <div className="flex w-full items-center gap-5 rounded-lg py-1 pr-3">
        <div>
          <BiSearchAlt2 className="text-l cursor-pointer text-panel-header-icon" />
        </div>
        <div className="flex-grow-[2]">
          <Input
            value={value}
            setValue={setValue}
            placeholder="search entire chat"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
