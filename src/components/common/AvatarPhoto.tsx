import { SIZE } from "@/constant/size";
import { Dispatch, SetStateAction, useState } from "react";

import { FaCamera } from "react-icons/fa";

interface IAvatar {
  size: keyof typeof SIZE;
  img: string;
  setContextMenuVisible: Dispatch<SetStateAction<boolean>>;
  setContextMenuCoord: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

const AvatarPhoto = ({
  size,
  img,
  setContextMenuVisible,
  setContextMenuCoord,
}: IAvatar) => {
  const showContextMenu = (e: React.MouseEvent<any>) => {
    setContextMenuCoord({ x: e.pageX, y: e.pageY });
    setContextMenuVisible(true);
  };

  return (
    <div className="flex items-center justify-center">
      {size === SIZE.SM && (
        <img src={img} alt="avatar" className={`h-10 w-10 rounded-full`} />
      )}
      {size === SIZE.LG && (
        <img src={img} alt="avatar" className={`h-14 w-14 rounded-full`} />
      )}
      {size === SIZE.XL && (
        <div className="relative cursor-pointer z-0">
          <div
            className="bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 rounded-full flex items-center justify-center flex-col text-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-[300]"
            id="context-opener"
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
              className={`h-60 w-60 rounded-full object-cover `}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarPhoto;
