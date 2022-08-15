import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Mačji boter</title>
        </Head>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/">
            <a>Domov</a>
          </Link>
          <Link href="/muce">
            <a>Seznam muc</a>
          </Link>
        </div>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default CustomApp;
