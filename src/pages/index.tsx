// setting
import Cookies from "cookies";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQueryClient } from "react-query";

// business
import { COOKIE, GET_USER, REFRESH } from "@/constant/api";
import { SIGN_IN_PAGE } from "@/constant/path";
import { queryKeys } from "@/constant/queryKeys";
import { postFetch } from "@/lib/api";
import { useGetQueryAccount } from "@/hooks/useQueryAccount";
import { useSearchStore, useUserStore } from "@/store";
import { IUserInfo } from "@/type";

// components
import ChatList from "@/components/ChatList";
import useSetSockets from "@/hooks/useSetSockets";
import dynamic from "next/dynamic";
import ChatBox from "@/components/ChatBox";
import SearchMessages from "@/components/ChatBox/SearchMessages";
import { useRef } from "react";

const Empty = dynamic(() => import("../components/ChatBox/Empty"), {
  ssr: false,
  loading: () => <div>...loading</div>,
});

export default function Home() {
  const client = useQueryClient();
  const currentChatUser = useUserStore((set) => set.currentChatUser);
  const initData = client.getQueryData(queryKeys.userInfo) as any;
  const result = useGetQueryAccount<IUserInfo>({
    url: GET_USER(initData?.email),
    queryKey: queryKeys.userInfo,
  });

  const $chatBox = useRef<HTMLElement>(null);

  const isSearchingMessages = useSearchStore((set) => set.isSearchingMessage);

  useSetSockets(client);

  if (result.isError) {
    return <main>error</main>;
  }

  if (result.isSuccess) {
    return (
      <main className="grid h-screen max-h-screen w-screen max-w-full grid-cols-main overflow-hidden">
        <ChatList />
        {currentChatUser ? (
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              isSearchingMessages
                ? // auto를 하면 최대한 늘어날 수 있는만큼 늘어남
                  "grid-cols-[57%_auto]"
                : "grid-cols-[100%_auto]"
            }`}
          >
            <ChatBox ref={$chatBox} />
            <SearchMessages parent={$chatBox} />
          </div>
        ) : (
          <Empty />
        )}
      </main>
    );
  }
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  res,
}) => {
  const cookies = new Cookies(req, res);

  const queryClient = new QueryClient();

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
