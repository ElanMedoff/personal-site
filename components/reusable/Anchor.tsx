import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

const anchorStyles =
  "underline underline-offset-2 hover:underline-offset-4 transition";

export default function Anchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={tm(anchorStyles, className)}>
      {children}
    </a>
  );
}

export { anchorStyles };
