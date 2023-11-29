// setting
import { useState } from "react";

// components
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import AvatarPhoto from "../common/AvatarPhoto";
import ContextMenu from "../common/ContextMenu";

// state
import { useLocalStorage, useSocketStore, useUiState } from "@/store";

// business
import { SIZE } from "@/constant/size";
import { useGetLoggedInUserInfo } from "@/hooks/useQueryAccount";
import { useRouter } from "next/router";
import { SIGN_IN_PAGE } from "@/constant/path";
import { useStore } from "@/hooks/useStore";

const ContactHeader = () => {
  const contextMenuOptions = [
    {
      name: "Log Out",
      callBack: async () => {
        await fetch("/api/removeCookies", {
          method: "POST",
        });
        socket?.emit("logout");
        storageStore?.setCurrentChatUser(null);
        router.push(SIGN_IN_PAGE);
      },
    },
  ];

  const loggedInUser = useGetLoggedInUserInfo();
  const router = useRouter();
  const socket = useSocketStore((set) => set.socket);
  const storageStore = useStore(useLocalStorage, (state) => state);

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
    <div className="flex h-[60px] items-center justify-between py-3 pl-4 pr-5">
      <div className="cursor-pointer">
        <AvatarPhoto
          size={SIZE.SM}
          img={loggedInUser?.profilePicture as string}
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

export default ContactHeader;
