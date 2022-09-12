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
    <section
      className={tm(
        "px-10 py-5 ",
        "sm:ml-[-5rem] sm:mr-[-5rem]",
        /* "m-auto md:w-auto", */
        className
      )}
    >
      <p className="text-3xl font-bold text-center uppercase sm:text-5xl md:text-7xl">
        {children}
      </p>
    </section>
  );
}
