import "src/styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as cookie from "cookie";
import { useRouter } from "next/router";
import { SearchParamStateProvider } from "use-search-param-state";
import { isProd, isVisualRegressionTest } from "src/utils/env";

const ONE_YEAR = 60 * 60 * 24 * 365;

interface Theme {
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean | null>>;
}

export const ThemeContext = createContext<Theme>({
  isDarkMode: false,
  setIsDarkMode: null,
});

export function useDarkMode() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  return [isDarkMode, setIsDarkMode as Dispatch<SetStateAction<boolean>>] as const;
}

type AppOwnProps = {
  isDarkModeCookie: boolean | null;
};
export default function MyApp({
  Component,
  pageProps,
  isDarkModeCookie,
}: AppProps<{ dehydratedState: DehydratedState }> & AppOwnProps) {
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeCookie);

  useEffect(() => {
    if (isDarkMode === null) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      document.cookie = cookie.serialize("isDarkMode_0", String(media.matches), {
        httpOnly: false,
        maxAge: ONE_YEAR,
        path: "/",
      });
      return;
    }

    document.cookie = cookie.serialize("isDarkMode_0", String(isDarkMode), {
      httpOnly: false,
      maxAge: ONE_YEAR,
      path: "/",
    });
  }, [isDarkMode, isDarkModeCookie]);

  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
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
      <SearchParamStateProvider
        options={{
          deleteEmptySearchParam: true,
          pushState: (href) => {
            router.push(href, undefined, { shallow: true });
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeContext.Provider
              value={{
                isDarkMode: isDarkMode ?? false,
                setIsDarkMode,
              }}
            >
              <div data-theme={isDarkMode ? "dark" : "light"}>
                <Component {...pageProps} />
              </div>
            </ThemeContext.Provider>
          </Hydrate>
          {isProd() || isVisualRegressionTest() ? null : <ReactQueryDevtools />}
        </QueryClientProvider>
      </SearchParamStateProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps> => {
  const pageProps = await App.getInitialProps(context);
  const { req, res } = context.ctx;
  if (!req || !res) {
    return {
      ...pageProps,
      isDarkModeCookie: null,
    };
  }

  const isDarkModeCookie = cookie.parse(req.headers.cookie || "").isDarkMode_0 as
    | string
    | undefined;

  if (isDarkModeCookie === undefined) {
    return {
      ...pageProps,
      isDarkModeCookie: null,
    };
  }

  return {
    ...pageProps,
    isDarkModeCookie: isDarkModeCookie === "true",
  };
};
