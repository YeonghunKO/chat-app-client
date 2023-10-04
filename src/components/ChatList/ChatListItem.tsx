import { IUserInfo } from "@/type";
import { useSocketStore, useUiState, useUserStore } from "@/store";
import { useQueryClient } from "react-query";
import { queryKeys } from "@/constant/queryKeys";
import { SIZE } from "@/constant/size";

import AvatarPhoto from "../common/AvatarPhoto";

const ChatListItem = ({ userInfo }: { userInfo: IUserInfo }) => {
  const { name, about, profilePicture, id } = userInfo;

  const queryClient = useQueryClient();
  const setCurrentChatUser = useUserStore((set) => set.setCurrentChatUser);
  const toggleContactsVisible = useUiState((set) => set.toggleContactsVisible);
  const socket = useSocketStore((set) => set.socket);
  const loggedInUser = queryClient.getQueryData<IUserInfo>(queryKeys.userInfo);

  const handleContactClick = () => {
    if (socket && loggedInUser) {
      socket.emit("set-onlineUsers", {
        userId: loggedInUser.id,
        value: { chatRoomId: id },
      });
      // 상태편의 메시지에 내한테 보낸 메시지가 read로 표시되도록 함
      socket.emit("mark-read", {
        from: loggedInUser.id,
        to: id,
      });
    }
    setCurrentChatUser(userInfo);
    toggleContactsVisible();
  };

  return (
    <div
      onClick={handleContactClick}
      className="flex cursor-pointer items-center justify-start gap-[10px] py-[5px] pb-2 pl-[10px] hover:bg-input-background"
    >
      <div className="w-[20%]">
        <AvatarPhoto img={profilePicture as string} size={SIZE.SM} />
      </div>
      <div className="w-[80%] border-b-[1px] border-b-conversation-border">
        <h2>{name}</h2>
        <h4 className="pr-5 text-secondary">{about || "\u00A0"}</h4>
      </div>
    </div>
  );
};

export default ChatListItem;
