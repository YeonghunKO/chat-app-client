import { useRef, useState } from "react";
import Image from "next/image";

// components
import Input from "@/components/common/Input";
import AvatarPhoto from "@/components/common/AvatarPhoto";
import ContextMenu from "@/components/common/ContextMenu";
import PhotoPicker from "@/components/common/PhotoPicker";
import PhotoLibrary from "@/components/common/PhotoLibrary";
import CapturePhoto from "@/components/common/CapturePhoto";

// buisiness
import { useUserStore } from "@/store/store";
import { SIZE } from "@/constant/size";

function SignUp() {
  const contextMenuOptions = [
    {
      name: "Take Photo",
      callBack: () => {
        setIsContextMenuVisible(false);
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Choose from Library",
      callBack: () => {
        setIsContextMenuVisible(false);
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callBack: () => {
        setIsContextMenuVisible(false);
        $photoPicker.current?.click();
      },
    },
    {
      name: "Remove Photo",
      callBack: () => {
        setIsContextMenuVisible(false);
        setNewImgSrc("/default_avatar.png");
      },
    },
  ];

  const $photoPicker = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });

  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const avatarImgSrc = useUserStore((set) => set.newUserImgSrc);
  const setNewImgSrc = useUserStore((set) => set.setNewImgSrc);

  const onCreateUser = () => {};

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-panel-header-background text-white">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp-gif"
          height={300}
          width={300}
          priority
        />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <div></div>
      <h2 className="text-2xl ">Create your profile</h2>
      <div className="mt-6 flex gap-6 ">
        <div className="mt-5 flex flex-col items-center justify-between gap-6">
          <Input label="Display Name" value={name} setValue={setName} isLabel />
          <Input label="About" value={about} setValue={setAbout} isLabel />

          <div className="flex items-center justify-center">
            <button
              className="rounded-lg bg-search-input-container-background p-5"
              onClick={onCreateUser}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <AvatarPhoto
            size={SIZE.XL}
            img={avatarImgSrc}
            setContextMenuCoord={setContextMenuCordinates}
            setContextMenuVisible={setIsContextMenuVisible}
          />

          {isContextMenuVisible && (
            <ContextMenu
              contextMenuOptions={contextMenuOptions}
              position={contextMenuCordinates}
              setContextMenuVisible={setIsContextMenuVisible}
            />
          )}
          <PhotoPicker ref={$photoPicker} />
          {showPhotoLibrary && (
            <PhotoLibrary setShowPhotoLibrary={setShowPhotoLibrary} />
          )}
          {showCapturePhoto && (
            <CapturePhoto setShowCapturePhoto={setShowCapturePhoto} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
