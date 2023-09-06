//setting
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//business
import { firebaseAuth } from "@/utils/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { SIGN_IN_USER } from "@/constant/api";
import { DASHBOARD, SIGN_UP_PAGE } from "@/constant/path";
import { queryKeys } from "@/constant/queryKeys";
import { usePostMutationQueryAccount } from "@/hooks/useQueryAccount";

//compoenents
import Input from "@/components/common/Input";
import { FcGoogle } from "react-icons/fc";
import { useUiState } from "@/store";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateToast = useUiState((state) => state.updateToastInfo);

  const { mutate } = usePostMutationQueryAccount({
    queryKey: queryKeys.userInfo,
    url: SIGN_IN_USER,
    onSuccess: () => router.push(DASHBOARD),
    onError: (err: any) => {
      updateToast({
        type: "ERROR",
        msg: err.response.data.message,
      });
    },
  });

  const handleAccountLogin = async () => {
    if (!email || !password) {
      updateToast({
        type: "ERROR",
        msg: "email and password are required",
      });
      return;
    }
    mutate({
      email,
      password,
    });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email, displayName, photoURL },
    } = await signInWithPopup(firebaseAuth, provider);
    mutate({
      email,
      loginType: "google",
    });
  };

  const handleCreateAccount = () => {
    router.push(SIGN_UP_PAGE);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-panel-header-background">
      <div className="flex h-4/5 w-screen items-center justify-center gap-6 bg-panel-header-background">
        <div className="flex flex-col items-center justify-center gap-2 text-white">
          <Image
            src="/whatsapp.gif"
            alt="whatsapp-gif"
            height={300}
            width={300}
          />
          <span className="text-7xl">WhatsApp</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 text-white">
          <Input label="Display Email" value={email} setValue={setEmail} />
          <Input
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />

          <button
            className="flex w-full items-center justify-center gap-7 rounded-lg bg-search-input-container-background p-5"
            onClick={handleAccountLogin}
          >
            <span className="text-2xl text-white">Login an Account</span>
          </button>
          <button
            className="flex w-full items-center justify-center gap-7 rounded-lg bg-search-input-container-background p-5"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="text-4xl" />
            <span className="text-2xl text-white">Login With Google</span>
          </button>
        </div>
      </div>

      <span
        className="cursor-pointer text-teal-light"
        onClick={handleCreateAccount}
      >
        create an account
      </span>
    </div>
  );
}
