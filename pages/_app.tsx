import { setCookie, getCookie } from "cookies-next";
import App, { AppContext, AppProps } from "next/app";
import "styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import Layout from "components/root/Layout";
import useIsDarkMode from "hooks/useIsDarkMode";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean>>;
}>({ isDarkMode: false, setIsDarkMode: null });

type MyAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  isDarkModeCookie: boolean;
};

export default function MyApp({
  Component,
  pageProps,
  isDarkModeCookie,
}: MyAppProps) {
  const [isDarkMode, setIsDarkMode] = useIsDarkMode(isDarkModeCookie);
  const [queryClient] = useState(() => new QueryClient());

  const description = "Mostly a blog, partly a personal website. Welcome!";
  const title = "elanmed.dev";

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />

        <title>{title}</title>
        <meta name="description" content={description} key="desc" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://elanmed.dev/og.jpg" />

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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <div data-theme={isDarkMode ? "dracula" : "emerald"}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </div>
          </ThemeContext.Provider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  const { req, res } = context.ctx;

  const isDarkModeCookie = getCookie("isDarkMode", { req, res }) as
    | boolean
    | undefined;

  if (isDarkModeCookie === undefined) {
    setCookie("isDarkMode", false, {
      req,
      res,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
    });
    return { ...ctx, isDarkModeCookie: false };
  }

  return {
    ...ctx,
    isDarkModeCookie,
  };
};
