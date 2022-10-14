import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";

export default function Banner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={tm(
        "w-full text-6xl font-bold text-center uppercase md:text-8xl px-10 py-10",
        className
      )}
    >
      {children}
    </p>
  );
}
