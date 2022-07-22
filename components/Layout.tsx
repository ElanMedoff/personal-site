import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="light">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
