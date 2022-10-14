import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { createContext, Dispatch, SetStateAction } from "react";
import useDarkMode from "../hooks/useDarkMode";

export const ThemeContext = createContext<{
  enabled: boolean;
  setEnabledState: null | Dispatch<SetStateAction<boolean>>;
}>({ enabled: false, setEnabledState: null });

export default function Layout({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ enabled, setEnabledState }}>
      <div className="transition duration-200">
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
        {children}
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
