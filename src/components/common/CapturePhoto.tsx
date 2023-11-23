import { useUserStore } from "@/store";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface ICapturePhoto {
  setShowCapturePhoto: Dispatch<SetStateAction<boolean>>;
}

const CapturePhoto = ({ setShowCapturePhoto }: ICapturePhoto) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const setImageSrc = useUserStore((set) => set.setNewImgSrc);

  const handleCloseBtn = () => {
    setShowCapturePhoto(false);
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(videoRef.current as HTMLVideoElement, 0, -50, 300, 200);
    const imgSrc = canvas.toDataURL("image/jpeg");

    setImageSrc(imgSrc);
    setShowCapturePhoto(false);
  };

  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="absolute left-1/3 top-1/4 flex h-4/6 w-2/6 flex-col items-center justify-between gap-3 rounded-lg bg-gray-900 pt-2 max-md:left-auto max-md:top-[2dvh] max-md:h-[90dvh] max-md:w-[80dvw] max-md:justify-center max-md:gap-[10dvh]">
      <div className="flex w-full flex-col gap-4">
        <div
          className="flex cursor-pointer items-end justify-end pr-2 pt-2"
          onClick={handleCloseBtn}
        >
          <IoClose className="h-10 w-10" />
        </div>
        <div className="flex h-full w-full justify-center">
          <video id="video" autoPlay ref={videoRef}></video>
        </div>
      </div>
      <button
        className=" mb-10 h-16 w-16 cursor-pointer rounded-full border-8 border-teal-light bg-white p-2"
        onClick={captureImage}
      ></button>
    </div>
  );
};

export default CapturePhoto;
