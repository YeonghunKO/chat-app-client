import { useUserStore } from "@/store";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

interface IPhotoLibrary {
  setShowPhotoLibrary: Dispatch<SetStateAction<boolean>>;
}

const PhotoLibrary = ({ setShowPhotoLibrary }: IPhotoLibrary) => {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  const setImageSrc = useUserStore((set) => set.setNewImgSrc);

  const handleCloseBtn = () => {
    setShowPhotoLibrary(false);
  };

  const handleImageClick = (img: string) => () => {
    setImageSrc(img);
    setShowPhotoLibrary(false);
  };

  return (
    <div className="fixed left-0 top-0 flex h-full max-h-[100dvh] w-full max-w-[100dvw] items-center justify-center">
      <div className="h-max w-max gap-6 rounded-lg bg-gray-900 p-4">
        <div
          className="flex cursor-pointer items-end justify-end pr-2 pt-2"
          onClick={handleCloseBtn}
        >
          <IoClose className="h-10 w-10" />
        </div>
        <div className="grid w-full grid-cols-3 items-center justify-center gap-16 p-20 max-md:gap-[20px] max-md:p-[20px]">
          {images.map((img, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={handleImageClick(img)}
            >
              <div className="h-[100px] w-[100px] max-md:h-[20dvw] max-md:w-[20dvw]">
                <img src={img} alt={img} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
