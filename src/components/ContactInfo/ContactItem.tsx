import { useQueryClient } from "react-query";
import { useSocketStore, useUiState, useUserStore } from "@/store";

import { IMessage, IUserInfo, TMEssageStatus, TMessageType } from "@/type";
import { queryKeys } from "@/constant/queryKeys";
import { SIZE } from "@/constant/size";

import { FaCamera, FaMicrophone } from "react-icons/fa";
import AvatarPhoto from "../common/AvatarPhoto";
import Status from "../ChatBox/Status";
import { calculateTime } from "@/utils/calculateTime";

const ContactItem = ({
  userInfo,
  messageInfo,
  isChatting = false,
}: {
  userInfo: IUserInfo;
  isChatting?: boolean;
  messageInfo?: Omit<IMessage, "sender" | "reciever"> & {
    totalUnReadCount: number;
  };
}) => {
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
    !isChatting && toggleContactsVisible();
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
        <h2 className="flex items-center justify-between ">
          <span>{name}</span>

          <span className="pr-[17px] text-[13px] text-secondary">
            {isChatting && messageInfo
              ? calculateTime(messageInfo.createdAt)
              : null}
          </span>
        </h2>

        {isChatting && messageInfo ? (
          <>
            <h4 className="flex items-center justify-between gap-[5px] pr-[17px] text-secondary">
              <div className="flex items-center gap-[5px]">
                <Status status={messageInfo.status} />
                {messageInfo.type === "text" && (
                  <span className="w-[14vw] overflow-hidden text-ellipsis whitespace-nowrap break-all">
                    {messageInfo.message}
                  </span>
                )}
                {messageInfo.type === "image" && (
                  <div className="flex items-center justify-center gap-[5px]">
                    <FaCamera className="text-white" />
                    <span className="">image</span>
                  </div>
                )}
                {messageInfo.type === "audio" && (
                  <div className="flex items-center justify-center gap-[5px]">
                    <FaMicrophone className="text-white" />
                    <span className="">audio</span>
                  </div>
                )}
              </div>
              {messageInfo.totalUnReadCount > 0 ? (
                <div className="h-[15px] w-[15px] rounded-full bg-icon-green text-center text-[10px] text-white">
                  {messageInfo.totalUnReadCount}
                </div>
              ) : null}
            </h4>
          </>
        ) : (
          <h4 className="pr-5 text-secondary">{about || "\u00A0"}</h4>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
