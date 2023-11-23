import { SIZE } from "@/constant/size";
import { Dispatch, SetStateAction } from "react";

import { FaCamera } from "react-icons/fa";

interface IAvatar {
  size: keyof typeof SIZE;
  img: string;
  setContextMenuVisible?: Dispatch<SetStateAction<boolean>>;
  setContextMenuCoord?: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

const AvatarPhoto = ({
  size,
  img,
  setContextMenuVisible,
  setContextMenuCoord,
}: IAvatar) => {
  const showContextMenu = (e: React.MouseEvent<any>) => {
    if (setContextMenuCoord && setContextMenuVisible) {
      setContextMenuCoord({ x: e.pageX, y: e.pageY });
      setContextMenuVisible(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {size === SIZE.SM && (
        <img src={img} alt="avatar" className="h-10 w-10 rounded-full" />
      )}
      {size === SIZE.LG && (
        <img src={img} alt="avatar" className="h-14 w-14 rounded-full" />
      )}
      {size === SIZE.XL && (
        <div className="relative z-0 cursor-pointer">
          <div
            className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-full bg-photopicker-overlay-background text-center opacity-0 transition-opacity duration-[300] hover:opacity-100 "
            onClick={showContextMenu}
          >
            <FaCamera className="text-2xl" />
            <span>
              Change <br></br> Profile <br></br> Photo
            </span>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={img}
              alt="avatar"
              className="h-60 w-60 rounded-full max-md:h-[15dvh] max-md:w-[15dvh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarPhoto;
