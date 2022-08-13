import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-base-200">
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
  );
}
