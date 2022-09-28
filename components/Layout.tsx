import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { createContext, Dispatch, SetStateAction } from "react";
import useDarkMode from "../hooks/useDarkMode";

export const ThemeContext = createContext<{
  enabled: boolean;
  setEnabledState: null | Dispatch<SetStateAction<boolean>>;
}>({ enabled: false, setEnabledState: null });

export default function Layout({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useDarkMode();
  console.log({ enabled });

  return (
    <ThemeContext.Provider value={{ enabled, setEnabledState }}>
      <div className="bg-base-300">
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
        <Content>{children}</Content>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
