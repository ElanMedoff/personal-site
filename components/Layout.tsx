import Head from "next/head";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { createContext, Dispatch, SetStateAction } from "react";
/* import useLocalStorage from "../hooks/useLocalStorage"; */

export const ThemeContext = createContext<{
  enabled: boolean;
  setEnabledState: null | Dispatch<SetStateAction<boolean>>;
}>({ enabled: false, setEnabledState: null });

export default function Layout({ children }: { children: ReactNode }) {
  /* const [enabled, setEnabledState] = useLocalStorage<boolean>( */
  /*   "dark-mode-enabled", */
  /*   false */
  /* ); */
  const [enabled, setEnabledState] = useState(false);

  return (
    <ThemeContext.Provider value={{ enabled, setEnabledState }}>
      <div data-theme={enabled ? "dracula" : "emerald"}>
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
