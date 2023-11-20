// setting
import { useContext, useState } from "react";

// business
import { useSearchStore, useUserStore } from "@/store";
import { SIZE } from "@/constant/size";

// components
import AvatarPhoto from "../common/AvatarPhoto";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoVideocam } from "react-icons/io5";
import ContextMenu from "../common/ContextMenu";
import { SocketCotext } from "../common/CallingContext";

const ChatHeader = () => {
  const contextMenuOptions = [
    {
      name: "Exit",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
  ];
  const { setIsStartCalling, callUser, isStartCalling, call } =
    useContext(SocketCotext);
  const { currentChatUser, onlineUsers } = useUserStore((set) => ({
    currentChatUser: set.currentChatUser,
    onlineUsers: set.onlineUsers,
  }));

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [menuCoord, setMenuCoord] = useState({ x: 0, y: 0 });
  const toggleSearchMessages = useSearchStore(
    (set) => set.toggleIsSearchingMessage,
  );

  const showContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    setIsContextMenuVisible(true);
    setMenuCoord({ x: e.pageX, y: e.pageY });
  };

  const handleSeachingMessage = () => {
    toggleSearchMessages();
  };

  const handleVideoCall = () => {
    if (!call.isRecieving) {
      setIsStartCalling && setIsStartCalling(true);
    }
    if (!isStartCalling && !call.callerInfo) {
      callUser();
    }
  };

  const isOtherOnline = onlineUsers?.has(currentChatUser?.id);

  return (
    <div className="z-[1] flex h-[60px] items-center justify-between border-l-[2px] border-l-input-background bg-panel-header-background px-4 py-2">
      <div className="flex items-center justify-center gap-6">
        <AvatarPhoto
          size={SIZE.SM}
          img={currentChatUser?.profilePicture as string}
        />
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span
            className={`text-sm ${
              isOtherOnline ? "text-icon-green" : "text-secondary"
            }`}
          >
            {isOtherOnline ? "online" : "offline"}
          </span>
        </div>
      </div>
      <div className="flex gap-6 ">
        <IoVideocam
          className="cursor-pointer text-xl text-panel-header-icon"
          onClick={handleVideoCall}
        />
        <BiSearchAlt2
          className="cursor-pointer text-xl text-panel-header-icon"
          onClick={handleSeachingMessage}
        />
        <BsThreeDotsVertical
          className="cursor-pointer text-xl text-panel-header-icon"
          onClick={showContextMenu}
        />
        {isContextMenuVisible && (
          <ContextMenu
            contextMenuOptions={contextMenuOptions}
            position={menuCoord}
            setContextMenuVisible={setIsContextMenuVisible}
          />
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
