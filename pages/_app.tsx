import App, { AppContext, AppProps } from "next/app";
import { setCookie, getCookie } from "cookies-next";
import "styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import Layout from "components/root/Layout";
import useIsDarkMode from "hooks/useIsDarkMode";
import { createContext, Dispatch, SetStateAction } from "react";
import { isProd } from "utils/envHelpers";

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean>>;
}>({ isDarkMode: false, setIsDarkMode: null });

type MyAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  darkMode: boolean;
};

export default function MyApp({ Component, pageProps, darkMode }: MyAppProps) {
  const [isDarkMode, setIsDarkMode] = useIsDarkMode(darkMode);

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

  const req = context.ctx.req!;
  const res = context.ctx.res!;
  const darkMode = getCookie("darkMode", { req, res }) as boolean | undefined;
  if (darkMode === undefined) {
    setCookie("darkMode", false, {
      httpOnly: false,
      secure: isProd(),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
    return { ...ctx, darkMode: false };
  }

  return { ...ctx, darkMode };
};
