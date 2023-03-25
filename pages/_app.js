import Head from "next/head";
import "../styles/globals.css";
import { ArtProvider } from "../context/ArtContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ArtProvider>
    <Head>
        <link rel="shortcut icon" href="/logo02.png" />
        <title>Art Gallery</title>
        <meta
          name="description"
          content="Art Gallery"
        />
      </Head>
      <Component {...pageProps} />
    </ArtProvider>
  );
};

export default MyApp;
