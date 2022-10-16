import Head from "next/head";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { createContext, Dispatch, SetStateAction } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
/* import useLocalStorage from "../hooks/useLocalStorage"; */

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean>>;
}>({ isDarkMode: false, setIsDarkMode: null });

export default function Layout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "dark-mode-isDarkMode",
    false
  );
  /* const [isDarkMode, setIsDarkMode] = useState(false); */

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
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
