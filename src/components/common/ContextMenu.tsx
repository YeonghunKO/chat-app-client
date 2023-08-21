import useUnmountIfClickedOutside from "@/hooks/useUnmountIfClickedOutside";
import React, { Dispatch, SetStateAction, useRef } from "react";

interface IContextMenu {
  contextMenuOptions: { name: string; callBack: () => void }[];
  position: { x: number; y: number };
  setContextMenuVisible: Dispatch<SetStateAction<boolean>>;
}

const ContextMenu = ({
  contextMenuOptions,
  position,
  setContextMenuVisible,
}: IContextMenu) => {
  const $contextMenu = useRef(null);

  useUnmountIfClickedOutside({
    ref: $contextMenu,
    callback: () => setContextMenuVisible(false),
  });

  const handleMenuClick =
    (callback: () => void) => (e: React.MouseEvent<HTMLLIElement>) => {
      callback();
    };

  return (
    <div
      className={`bg-dropdown-background fixed z-[100]`}
      ref={$contextMenu}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16)",
        top: position.y,
        left: position.x,
      }}
    >
      <ul>
        {contextMenuOptions.map(({ name, callBack }) => (
          <li
            className="hover:bg-background-default-hover px-5 py-2 cursor-pointer"
            onClick={handleMenuClick(callBack)}
            key={name}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
