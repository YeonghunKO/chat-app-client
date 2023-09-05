// setting
import { useState } from "react";

// components
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import AvatarPhoto from "../common/AvatarPhoto";
import ContextMenu from "../common/ContextMenu";

// state
import { useUiState } from "@/store";

// business
import { SIZE } from "@/constant/size";
import { useQueryClient } from "react-query";
import { queryKeys } from "@/constant/queryKeys";

const ChatListHeader = () => {
  const contextMenuOptions = [
    {
      name: "Log Out",
      callBack: () => {
        setContextMenuVisible(false);
      },
    },
  ];
  const queryClient = useQueryClient();

  const loggedInUser = queryClient.getQueryData(queryKeys.userInfo) as any;

  const setContactsList = useUiState((set) => set.toggleContactsVisible);
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });

  const handleAllContactsPage = () => {
    setContactsList();
  };

  const handleShowContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    setContextMenuVisible(true);
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
  };

  return (
    <div className="flex h-[60px] items-center justify-between px-4 py-3">
      <div className="cursor-pointer">
        <AvatarPhoto
          size={SIZE.SM}
          img={loggedInUser?.profilePicture}
          setContextMenuCoord={setContextMenuCordinates}
          setContextMenuVisible={setContextMenuVisible}
        />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="cursor-pointer text-xl text-panel-header-icon"
          title="New chat"
          onClick={handleAllContactsPage}
        />
        <BsThreeDotsVertical
          className="cursor-pointer text-xl text-panel-header-icon"
          onClick={handleShowContextMenu}
        />
        {isContextMenuVisible && (
          <ContextMenu
            contextMenuOptions={contextMenuOptions}
            position={contextMenuCordinates}
            setContextMenuVisible={setContextMenuVisible}
          />
        )}
      </div>
    </div>
  );
};

export default ChatListHeader;
