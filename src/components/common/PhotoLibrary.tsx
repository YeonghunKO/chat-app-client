import { useUserStore } from "@/store/store";
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
    <div className="fixed top-0 left-0 max-h-[100dvh] max-w-[100dvw] h-full w-full flex justify-center items-center">
      <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
          onClick={handleCloseBtn}
        >
          <IoClose className="h-10 w-10" />
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-16 p-20 w-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={handleImageClick(img)}
            >
              <Image src={img} alt={img} height={80} width={80} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
