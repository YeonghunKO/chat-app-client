import { useRef, useState } from "react";
import Image from "next/image";

// components
import Input from "@/components/common/Input";
import AvatarPhoto from "@/components/common/AvatarPhoto";

// buisiness
import { useUserStore } from "@/store/store";
import { SIZE } from "@/constant/size";
import ContextMenu from "@/components/common/ContextMenu";

function SignUp() {
  const avatarDOMRef = useRef(null);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });

  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [grabImage, setGrabImage] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const imgSrc = useUserStore((set) => set.newUserImgSrc);

  const onCreateUser = () => {};

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp-gif"
          height={300}
          width={300}
        />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <div></div>
      <h2 className="text-2xl ">Create your profile</h2>
      <div className="flex gap-6 mt-6 ">
        <div className="flex flex-col items-center justify-between mt-5 gap-6">
          <Input label="Display Name" value={name} setValue={setName} isLabel />
          <Input label="About" value={about} setValue={setAbout} isLabel />

          <div className="flex items-center justify-center">
            <button
              className="bg-search-input-container-background p-5 rounded-lg"
              onClick={onCreateUser}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <AvatarPhoto
            size={SIZE.XL}
            img={imgSrc}
            setContextMenuCoord={setContextMenuCordinates}
            setContextMenuVisible={setIsContextMenuVisible}
          />

          {isContextMenuVisible && (
            <ContextMenu
              position={contextMenuCordinates}
              setContextMenuVisible={setIsContextMenuVisible}
              setShowPhotoLibrary={setShowPhotoLibrary}
              setGrabImage={setGrabImage}
              setShowCapturePhoto={setShowCapturePhoto}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
