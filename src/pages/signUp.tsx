// setting
import { useRef, useState } from "react";
import Image from "next/image";

// components
import Input from "@/components/common/Input";
import AvatarPhoto from "@/components/common/AvatarPhoto";
import PhotoPicker from "@/components/common/PhotoPicker";

// buisiness

import { useUiState, useUserStore } from "@/store";

import { FcGoogle } from "react-icons/fc";
import { usePostMutationQueryAccount } from "@/hooks/useQueryAccount";
import { queryKeys } from "@/constant/queryKeys";
import { SIGN_UP_USER } from "@/constant/api";
import { DASHBOARD } from "@/constant/path";
import { SIZE } from "@/constant/size";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import { TOAST_TYPE } from "@/constant/type";
import { resizeFile } from "@/utils/resizeImg";
import dynamic from "next/dynamic";
import Loading from "@/components/common/Loading";

const ContextMenu = dynamic(() => import("../components/common/ContextMenu"));
const PhotoLibrary = dynamic(() => import("../components/common/PhotoLibrary"));
const CapturePhoto = dynamic(() => import("../components/common/CapturePhoto"));

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

  const router = useRouter();
  const updateToast = useUiState((state) => state.updateToastInfo);

  const { mutate, data } = usePostMutationQueryAccount({
    queryKey: queryKeys.userInfo,
    url: SIGN_UP_USER,
    onSuccess: () => {
      setIsLoggingIn(true);
      router.push(DASHBOARD);
    },
    onError: (err: any) => {
      updateToast({
        type: TOAST_TYPE.ERROR,
        msg: !!err
          ? err
          : "Something went wrong from the server. Please try again",
      });
    },
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });

  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const avatarImgSrc = useUserStore((set) => set.newUserImgSrc);
  const setNewImgSrc = useUserStore((set) => set.setNewImgSrc);

  const handleCreateUser = () => {
    if (!email || !password) {
      updateToast({
        type: "ERROR",
        msg: "email and password are required",
      });

      return;
    }

    mutate({
      email,
      name,
      about,
      password,
      profilePicture: avatarImgSrc,
    });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email, displayName, photoURL },
    } = await signInWithPopup(firebaseAuth, provider);

    mutate({
      email,
      name: displayName,
      profilePicture: photoURL,
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files as FileList;

      const reader = new FileReader();

      if (file[0]) {
        reader.readAsDataURL(file[0]);
        const image = await resizeFile({
          file: file[0],
          size: 200,
          outPut: "base64",
        });

        setNewImgSrc(image as string);
      }
    } catch (error) {
      updateToast({
        type: TOAST_TYPE.ERROR,
        msg: "Only Image Files can be uploaded",
      });
    }
  };

  return (
    <div className="flex h-[100dvh] w-screen items-center justify-center gap-[8dvw] bg-panel-header-background text-white">
      {isLoggingIn ? (
        <div className="absolute left-0 top-0 z-[10] h-[100dvh] w-screen bg-black opacity-50">
          <Loading />
        </div>
      ) : null}

      <div className="flex flex-col items-center justify-center gap-[5dvh] max-md:hidden">
        <Image
          src="/chat.gif"
          alt="chat-gif"
          height={450}
          width={450}
          priority
        />
        <span className="text-7xl">FunChat</span>
        <button
          className="flex w-[70%] items-center justify-center gap-7 rounded-lg bg-search-input-container-background p-5"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="text-3xl" />
          <span className="text-2xl text-white">Sign Up With Google</span>
        </button>
      </div>

      <div className="flex h-[100dvh] flex-col justify-center gap-6 max-md:w-[80dvw] max-md:gap-[10px] ">
        <div className="flex items-center justify-center">
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

          <PhotoPicker
            ref={$photoPicker}
            onChangeSetImage={handlePhotoChange}
          />
          {showPhotoLibrary && (
            <PhotoLibrary setShowPhotoLibrary={setShowPhotoLibrary} />
          )}
          {showCapturePhoto && (
            <CapturePhoto setShowCapturePhoto={setShowCapturePhoto} />
          )}
        </div>
        <div className="mt-5 flex flex-col items-center justify-between gap-2">
          <Input label="Email" value={email} setValue={setEmail} />
          <Input label="Name" value={name} setValue={setName} />
          <Input label="About" value={about} setValue={setAbout} />
          <Input
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
        </div>

        <div className="flex w-full items-center justify-around">
          <button
            className="w-full rounded-lg bg-search-input-container-background p-5 max-md:p-[12px] max-md:text-[2]"
            onClick={handleCreateUser}
          >
            Create Profile
          </button>
        </div>
        <button
          className="hidden w-full items-center justify-center gap-7 rounded-lg bg-search-input-container-background p-5 max-md:flex max-md:gap-[10px] max-md:p-[12px]"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="text-4xl" />
          <span className="text-2xl text-white max-md:text-[15px]">
            Sign Up With Google
          </span>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
