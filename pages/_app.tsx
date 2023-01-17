import { setCookie, getCookie } from "cookies-next";
import App, { AppContext, AppProps } from "next/app";
import "styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import Layout from "components/root/Layout";
import useIsDarkMode from "hooks/useIsDarkMode";
import { createContext, Dispatch, SetStateAction } from "react";

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean>>;
}>({ isDarkMode: false, setIsDarkMode: null });

type MyAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  isDarkModeCookie: boolean | null;
  message: string;
};

export default function MyApp({
  Component,
  pageProps,
  isDarkModeCookie,
  message,
}: MyAppProps) {
  const [isDarkMode, setIsDarkMode] = useIsDarkMode(isDarkModeCookie);
  console.log({ message });

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <title>elanmed.dev</title>
        <meta
          name="description"
          content="Mostly a blog, partly a personal website"
        />
        <meta
          name="google-site-verification"
          content="CE4T4wzf1pNuiL7JwIC9CqNdJyCfsfaNyLjkeFRr9Dc"
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9Y9725W18J"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9Y9725W18J');
        `}
      </Script>
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        <div data-theme={isDarkMode ? "dracula" : "emerald"}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  const { req, res } = context.ctx;

  const isClient = typeof window !== "undefined";
  const message = `${isClient}, ${JSON.stringify(req)}`;
  if (isClient) {
    return { ...ctx, isDarkModeCookie: null, message };
  }

  const isDarkModeCookie = getCookie("isDarkMode", { req, res }) as
    | boolean
    | undefined;

  if (isDarkModeCookie === undefined) {
    setCookie("isDarkMode", false, { req, res, httpOnly: false });
    return { ...ctx, isDarkModeCookie: false, message };
  }

  return {
    ...ctx,
    isDarkModeCookie,
    message,
  };
};
