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
        "w-full font-bold text-center uppercase px-10 py-10",
        "text-4xl sm:text-6xl md:text-8xl",
        className
      )}
    >
      {children}
    </p>
  );
}
