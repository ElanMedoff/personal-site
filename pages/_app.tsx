import App, { AppContext, AppProps } from "next/app";
import cookie from "cookie";
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
  isDarkModeCookie: boolean;
  errorMessage?: string;
};

export default function MyApp({
  Component,
  pageProps,
  isDarkModeCookie,
  errorMessage,
}: MyAppProps) {
  if (errorMessage) {
    console.error(errorMessage);
  }
  const [isDarkMode, setIsDarkMode] = useIsDarkMode(isDarkModeCookie);

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
  let errorMessage = "";
  if (!context.ctx.req?.headers?.cookie) {
    errorMessage = `ERROR: ${context.ctx.req}`;
    return { ...ctx, isDarkMode: false };
  }

  const cookies = cookie.parse(context.ctx.req!.headers.cookie!);
  const { isDarkMode } = cookies;

  if (isDarkMode === undefined) {
    cookie.serialize("isDarkMode", "false", { httpOnly: false });
    return { ...ctx, isDarkModeCookie: false, errorMessage };
  }

  return {
    ...ctx,
    isDarkModeCookie: isDarkMode === "true" ? true : false,
    errorMessage,
  };
};
