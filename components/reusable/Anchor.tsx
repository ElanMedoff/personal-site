import { ReactNode } from "react";

export default function Anchor({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="underline underline-offset-2 hover:underline-offset-4 transition-all"
    >
      {children}
    </a>
  );
}
