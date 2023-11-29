// setting
import { useContext, useState } from "react";

// business
import {
  useLocalStorage,
  useSearchStore,
  useSocketStore,
  useUserStore,
} from "@/store";
import { SIZE } from "@/constant/size";

// components
import AvatarPhoto from "../common/AvatarPhoto";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoVideocam } from "react-icons/io5";
import ContextMenu from "../common/ContextMenu";
import { SocketCotext } from "../common/CallingContext";
import { useGetLoggedInUserInfo } from "@/hooks/useQueryAccount";
import { useStore } from "@/hooks/useStore";

const ChatHeader = () => {
  const contextMenuOptions = [
    {
      name: "Exit",
      callBack: () => {
        setIsContextMenuVisible(false);
        if (socket) {
          socket.emit("set-onlineUsers", {
            userId: loggedInUser.id,
            value: { chatRoomId: null },
          });
        }
        storageStore?.setCurrentChatUser(null);
      },
    },
  ];

  const { setIsStartCalling, callUser, isStartCalling, call } =
    useContext(SocketCotext);
  const { onlineUsers } = useUserStore((set) => ({
    onlineUsers: set.onlineUsers,
  }));

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [menuCoord, setMenuCoord] = useState({ x: 0, y: 0 });
  const toggleSearchMessages = useSearchStore(
    (set) => set.toggleIsSearchingMessage,
  );

  const loggedInUser = useGetLoggedInUserInfo();

  const socket = useSocketStore((set) => set.socket);
  const storageStore = useStore(useLocalStorage, (state) => state);

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

  const isOtherOnline = onlineUsers?.has(storageStore?.currentChatUser?.id);

  return (
    <div className="z-[1] flex h-[60px] items-center justify-between border-l-[2px] border-l-input-background bg-panel-header-background px-4 py-2">
      <div className="flex items-center justify-center gap-6">
        <AvatarPhoto
          size={SIZE.SM}
          img={storageStore?.currentChatUser?.profilePicture as string}
        />
        <div className="flex flex-col">
          <span className="text-primary-strong">
            {storageStore?.currentChatUser?.name}
          </span>
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
