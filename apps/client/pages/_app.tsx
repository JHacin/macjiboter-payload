import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <>
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
  </>
);

export default CustomApp;
