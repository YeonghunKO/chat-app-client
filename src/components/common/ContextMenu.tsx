import { useUserStore } from "@/store/store";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";

interface IContextMenu {
  position: { x: number; y: number };
  setContextMenuVisible: Dispatch<SetStateAction<boolean>>;
  setShowPhotoLibrary: Dispatch<SetStateAction<boolean>>;
  setGrabImage: Dispatch<SetStateAction<boolean>>;
  setShowCapturePhoto: Dispatch<SetStateAction<boolean>>;
}

const ContextMenu = ({
  position,
  setContextMenuVisible,
  setShowPhotoLibrary,
  setGrabImage,
  setShowCapturePhoto,
}: IContextMenu) => {
  const contextMenuRef = useRef(null);

  const setImage = useUserStore((set) => set.setNewImgSrc);

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callBack: () => {
        setContextMenuVisible(false);
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Choose from Library",
      callBack: () => {
        setContextMenuVisible(false);
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callBack: () => {
        setContextMenuVisible(false);
        setGrabImage(true);
      },
    },
    {
      name: "Remove Photo",
      callBack: () => {
        setContextMenuVisible(false);
        setImage("/default_avatar.png");
      },
    },
  ];

  const handleMenuClick =
    (callback: () => void) => (e: React.MouseEvent<HTMLLIElement>) => {
      callback();
    };

  return (
    <div
      className={`bg-dropdown-background fixed z-[100]`}
      ref={contextMenuRef}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16)",
        top: position.y,
        left: position.x,
      }}
    >
      <ul>
        {contextMenuOptions.map(({ name, callBack }) => (
          <>
            <li
              className="hover:bg-background-default-hover px-5 py-2 cursor-pointer"
              onClick={handleMenuClick(callBack)}
            >
              <span className="text-white">{name}</span>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
