import { UPDATE_CHAT_LIST } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { useGetQueryAccount } from "@/hooks/useQueryAccount";
import { useQueryClient } from "react-query";
import ContactItem from "./ContactItem";
import { IMessage, IUserInfo } from "@/type";
import { useSearchStore } from "@/store";
import { useEffect, useState } from "react";

const ChatList = () => {
  const queryClient = useQueryClient();

  const loggedInUser = queryClient.getQueryData(queryKeys.userInfo) as any;

  const { filteredChatListNumbers, searchingValue } = useSearchStore((set) => ({
    filteredChatListNumbers: set.filteredChatList,
    searchingValue: set.allMessageSearchValue,
  }));

  const [filteredChatList, setFilteredChatList] = useState<any[]>();

  const { data: chatList } = useGetQueryAccount<
    ({
      chatUser: IUserInfo;
      totalUnReadCount: number;
    } & Omit<IMessage, "sender" | "reciever">)[]
  >({
    queryKey: queryKeys.chatLists,
    url: UPDATE_CHAT_LIST(loggedInUser?.id),
  });

  useEffect(() => {
    if (chatList?.length) {
      const filteredChatList = chatList?.filter((list) => {
        const isChatToBeIncluded = filteredChatListNumbers.includes(
          list.chatUser.id,
        );
        if (isChatToBeIncluded) {
          return true;
        } else {
          return false;
        }
      });

      setFilteredChatList(filteredChatList);
    }
  }, [filteredChatListNumbers, chatList]);

  // if (isLoading) {
  //   return (
  //     <div className=" flex h-full items-center justify-center">loading...</div>
  //   );
  // }

  return (
    <div className="custom-scrollbar h-full overflow-auto">
      {searchingValue.length > 0 ? (
        filteredChatList && filteredChatList?.length > 0 ? (
          filteredChatList.map((list) => {
            const { chatUser, ...messageInfo } = list;
            return (
              <ContactItem
                key={messageInfo.id}
                userInfo={chatUser}
                messageInfo={messageInfo}
                isChatting={true}
              />
            );
          })
        ) : (
          <div className="flex h-full items-center justify-center">
            No Messages Found
          </div>
        )
      ) : (
        chatList?.map((list) => {
          const { chatUser, ...messageInfo } = list;
          return (
            <ContactItem
              key={messageInfo.id}
              userInfo={chatUser}
              messageInfo={messageInfo}
              isChatting={true}
            />
          );
        })
      )}
    </div>
  );
};

export default ChatList;
