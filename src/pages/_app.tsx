import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "@/components/common/Layout";

import "@/styles/globals.css";

import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

// export const queryErrorHandler = (error: any) => {
//   console.log("error queryErrorHandler", error);
//   // toast(`데이터를 가져오지 못했습니다! ${error.message}`);
// };

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 0,
//       suspense: false,
//     },
//   },
// });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            // suspense: true,
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
          },
          mutations: {
            useErrorBoundary: true,
          },
        },
      }),
  );
  return (
    <>
      <Head>
        <title>Whatsapp</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
