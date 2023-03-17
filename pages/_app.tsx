import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Conta um Conto</title>
        <meta
          name="description"
          content="Conta um Conto - um site interativo para crianças onde elas podem personalizar e criar histórias incríveis! Com a ajuda de inteligência artificial, oferecemos aventuras únicas e empolgantes para estimular a imaginação e promover o amor pela leitura."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
