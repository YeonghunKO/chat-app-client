// setting
import Cookies from "cookies";
import { GetServerSideProps } from "next";
import { dehydrate } from "react-query";
import { queryClient } from "./_app";

// business
import { COOKIE, REFRESH } from "@/constant/api";
import { SIGN_IN_PAGE } from "@/constant/path";
import { queryKeys } from "@/constant/queryKeys";
import { postFetch } from "@/lib/api";
import { useLocalStorage, useSearchStore, useUiState } from "@/store";

// components
import ContactInfo from "@/components/ContactInfo";
import useSetSockets from "@/hooks/useSetSockets";
import dynamic from "next/dynamic";
import ChatBox from "@/components/ChatBox";
import SearchMessages from "@/components/ChatBox/SearchMessages";
import { useRef } from "react";
import CallingContainer from "@/components/Calling/CallingContainer";
import CallingContextProvider from "@/components/common/CallingContext";
import Loading from "@/components/common/Loading";
import { IoIosArrowForward } from "react-icons/io";
import { useStore } from "@/hooks/useStore";

const Empty = dynamic(() => import("../components/ChatBox/Empty"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Home() {
  const { toggleContactInfoClosed } = useUiState((set) => ({
    toggleContactInfoClosed: set.toggleContactInfoClosed,
  }));

  const { isSearchingMessages } = useSearchStore((set) => ({
    isSearchingMessages: set.isSearchingMessage,
  }));

  const $chatBox = useRef<HTMLDivElement>(null);

  useSetSockets();

  const currentChatUser = useStore(
    useLocalStorage,
    (state) => state.currentChatUser,
  );

  const handleCloseInfoButton = () => {
    toggleContactInfoClosed(false);
  };

  return (
    <CallingContextProvider>
      <main className="h-[100dvh] w-screen overflow-hidden md:grid">
        <div
          onClick={handleCloseInfoButton}
          className="absolute -left-[8px] top-1/2 z-[10] cursor-pointer rounded-full bg-incoming-background p-[5px] text-[20px] text-[#ADBAC1]"
        >
          <IoIosArrowForward />
        </div>
        <CallingContainer />
        <ContactInfo />
        {currentChatUser ? (
          <section
            className={`relative flex duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:grid ${
              isSearchingMessages
                ? // auto를 하면 최대한 늘어날 수 있는만큼 늘어남
                  "md:grid-cols-[65%_auto] lg:grid-cols-[75%_auto]"
                : "md:grid-cols-[100%_auto]"
            }`}
          >
            <ChatBox ref={$chatBox} />
            <SearchMessages parent={$chatBox} />
          </section>
        ) : (
          <Empty />
        )}
      </main>
    </CallingContextProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  const cookies = new Cookies(req, res);

  const { accessToken, refreshTokenIdx } = req.cookies;
  if (!accessToken || !refreshTokenIdx) {
    return {
      redirect: {
        destination: SIGN_IN_PAGE,
        permanent: false,
      },
    };
  }

  try {
    const result = await queryClient.fetchQuery(queryKeys.userInfo, () =>
      postFetch({
        url: REFRESH,
        option: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            refreshTokenIdx: decodeURIComponent(refreshTokenIdx),
          },
        },

        mapper: (data) => ({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          about: data.user.about,
          profilePicture: data.user.profilePicture,
        }),
      }),
    );

    const newAccessToken = result.accessToken;

    // getserversideprops는 브라우저단이 아닌 서버단이라서 백엔드 응답에 set-cookie포함되어있어도 실제 쿠키 세팅이 안됨.
    // 그래서 이렇게 다시 쿠키를 세팅해주어야 함.
    newAccessToken && cookies.set(COOKIE.ACCESS_TOKEN, newAccessToken);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        loggedInUser: result,
      },
    };
  } catch (error: any) {
    const redirctDestination = error.response.data.redirctDestination;

    if (redirctDestination) {
      return {
        redirect: {
          destination: SIGN_IN_PAGE,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
