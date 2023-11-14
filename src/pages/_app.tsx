import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "@/components/common/Layout";
import { cookies } from "next/headers";

import "@/styles/globals.css";

import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useUserStore } from "@/store";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const setLoggedInUserInfo = useUserStore((set) => set.setLoggedInUserInfo);
  setLoggedInUserInfo(pageProps.loggedInUser);
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
