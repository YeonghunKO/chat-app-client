import { UPDATE_CHAT_LIST } from "@/constant/api";
import { queryKeys } from "@/constant/queryKeys";
import { useGetQueryAccount } from "@/hooks/useQueryAccount";
import { useQueryClient } from "react-query";
import ChatListItem from "./ChatListItem";
import { IMessage, IUserInfo } from "@/type";

const List = () => {
  const queryClient = useQueryClient();
  const loggedInUser = queryClient.getQueryData(queryKeys.userInfo) as any;
  const {
    data: chatList,
    isLoading,
    isSuccess,
  } = useGetQueryAccount<
    ({
      chatUser: IUserInfo;
      totalUnReadCount: number;
    } & Omit<IMessage, "sender" | "reciever">)[]
  >({
    queryKey: queryKeys.chatLists,
    url: UPDATE_CHAT_LIST(loggedInUser?.id),
  });

  // console.log("chatlist data", chatList[0]);
  if (isLoading) {
    return (
      <div className=" flex h-full items-center justify-center">loading...</div>
    );
  }

  if (isSuccess) {
    return (
      <div className="custom-scrollbar overflow-scroll">
        {chatList.map((list) => {
          const { chatUser, ...messageInfo } = list;
          return (
            <ChatListItem
              key={messageInfo.id}
              userInfo={chatUser}
              messageInfo={messageInfo}
              isChatting={true}
            />
          );
        })}
      </div>
    );
  }
};

export default List;
