import App, { AppContext, AppProps } from "next/app";
import cookie from "cookie";
import "styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import Layout from "components/root/Layout";
import useIsDarkMode from "hooks/useIsDarkMode";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean>>;
}>({ isDarkMode: false, setIsDarkMode: null });

type MyAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  /* darkMode: boolean; */
  /* message: any; */
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const [isDarkMode, setIsDarkMode] = useIsDarkMode();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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

/* MyApp.getInitialProps = async (context: AppContext) => { */
/*   const ctx = await App.getInitialProps(context); */
/**/
/*   let message; */
/*   const { req, res } = context.ctx; */
/*   message = `${req}, ${res}`; */
/**/
/*   if (!req || !res) { */
/*     return { ...ctx }; */
/*   } */
/**/
/*   const cookies = cookie.parse(req.headers.cookie ?? ""); */
/*   const { darkMode } = cookies; */
/**/
/*   if (darkMode === undefined) { */
/*     cookie.serialize("darkMode", "false", { httpOnly: false }); */
/*     return { ...ctx, darkMode: false }; */
/*   } */
/**/
/*   message = `cookie defined, value is ${darkMode}`; */
/*   return { ...ctx, darkMode: darkMode === "true" ? true : false, message }; */
/* }; */
