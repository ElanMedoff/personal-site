import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/styleHelpers";

const anchorStyles = "underline underline-offset-2 hover:underline-offset-4";

export function Anchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={tm(anchorStyles, className)}
      style={{
        transitionProperty: "text-underline-offset",
        ...transitionProperties,
      }}
    >
      {children}
    </a>
  );
}

export { anchorStyles };
