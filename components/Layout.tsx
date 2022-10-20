import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";
import { createContext, Dispatch, SetStateAction } from "react";
import useIsDarkMode from "../hooks/useIsDarkMode";

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean>>;
}>({ isDarkMode: false, setIsDarkMode: null });

export default function Layout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useIsDarkMode();

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div
        data-theme={isDarkMode ? "dracula" : "emerald"}
        className="transition-colors"
      >
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
        <Header />
        <div>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}
