import { COOKIE, REFRESH } from "@/constant/api";
import { SIGN_IN_PAGE } from "@/constant/path";
import { queryKeys } from "@/constant/queryKeys";
import { postFetch } from "@/lib/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQueryClient } from "react-query";

import Cookies from "cookies";

export default function Home() {
  const router = useRouter();
  const client = useQueryClient();
  console.log("client", client.getQueryData(queryKeys.userInfo));

  return (
    <main>
      <button onClick={() => router.push("/login")}>go to login</button>
    </main>
  );
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
          name: data.user.name,
          email: data.user.email,
          about: data.user.about,
          profilePicture: data.user.profilePicture,
        }),
      }),
    );

    const newAccessToken = result.accessToken;
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
