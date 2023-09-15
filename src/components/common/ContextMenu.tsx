import useUnmountIfClickedOutside from "@/hooks/useUnmountIfClickedOutside";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const $contextMenu = useRef<HTMLDivElement>(null);
  const [suitableXPos, setSuitableXPos] = useState(-100);

  useUnmountIfClickedOutside({
    ref: $contextMenu,
    callback: () => setContextMenuVisible(false),
  });

  const handleMenuClick =
    (callback: () => void) => (e: React.MouseEvent<HTMLLIElement>) => {
      callback();
    };

  // prevent menu from sticking to the outside of body
  useEffect(() => {
    const getSuitableXPos = () => {
      let isMenuStickingOutside;
      if ($contextMenu.current) {
        const bodyWidth = document.body.getBoundingClientRect().width;
        const menuWidth = $contextMenu.current.getBoundingClientRect().width;
        isMenuStickingOutside = bodyWidth < position.x + menuWidth;
        if (isMenuStickingOutside) {
          setSuitableXPos(bodyWidth - menuWidth - 10);
        } else {
          setSuitableXPos(position.x);
        }
      }
    };

    getSuitableXPos();
  }, [$contextMenu.current]);

  return (
    <div
      className="fixed z-[100] bg-dropdown-background"
      ref={$contextMenu}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16)",
        top: position.y,
        left: suitableXPos,
      }}
    >
      <ul>
        {contextMenuOptions.map(({ name, callBack }) => (
          <li
            className="cursor-pointer px-5 py-2 hover:bg-background-default-hover"
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
