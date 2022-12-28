import { ReactNode } from "react";
import Header from "components/root/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
