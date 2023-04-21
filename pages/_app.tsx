import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fabula Infantil</title>
        <meta
          name="description"
          content="Fabula Infantil - um site interativo para crianças onde elas podem personalizar e criar histórias incríveis! Com a ajuda de inteligência artificial, oferecemos aventuras únicas e empolgantes para estimular a imaginação e promover o amor pela leitura."
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2YQKQQP4ZX"
        />
        <script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-2YQKQQP4ZX');
        `}
        </script>
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Component {...pageProps} />

      <Analytics />
    </>
  );
}
