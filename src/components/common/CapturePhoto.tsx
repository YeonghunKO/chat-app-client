import { useUserStore } from "@/store/store";
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
        console.log("sdf");
        videoRef.current.srcObject = stream;
      }
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 flex-col gap-3 rounded-lg pt-2 flex items-center justify-between">
      <div className="flex flex-col gap-4 w-full">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
          onClick={handleCloseBtn}
        >
          <IoClose className="h-10 w-10" />
        </div>
        <div className="flex justify-center">
          <video id="video" width="400" autoPlay ref={videoRef}></video>
        </div>
      </div>
      <button
        className=" h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10"
        onClick={captureImage}
      ></button>
    </div>
  );
};

export default CapturePhoto;
