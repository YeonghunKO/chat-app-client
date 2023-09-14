import { IUserInfo } from "@/type";
import AvatarPhoto from "../common/AvatarPhoto";
import { SIZE } from "@/constant/size";
import { useSocketStore, useUiState, useUserStore } from "@/store";
import { useQueryClient } from "react-query";
import { queryKeys } from "@/constant/queryKeys";

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
