import Image from "next/image";

import { CHECK_USER_ROUTE } from "@/constant/path";

import { firebaseAuth } from "@/utils/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/store";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Login({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("repo", repo);

  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      const { data } = await axios.post(CHECK_USER_ROUTE, { email });
      console.log("res", data.status);

      if (!data.status) {
        router.push("/signUp ");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp-gif"
          height={300}
          width={300}
        />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login With Google</span>
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ repo: string }> = async (
  context
) => {
  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }
  //
  return {
    props: {
      repo: "cvz",
    },
  };
};
