import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type Theme = "cyberpunk" | "dracula";
export const ThemeContext = createContext<{
  theme: Theme | null;
  setTheme: null | Dispatch<SetStateAction<Theme>>;
}>({ theme: null, setTheme: null });

export default function Layout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("cyberpunk");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="bg-base-300" data-theme={theme}>
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
