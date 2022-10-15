import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";

export default function Banner({
  primary,
  secondary,
  className,
}: {
  primary: ReactNode;
  secondary: ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full">
      <p
        className={tm(
          "w-full font-bold text-center uppercase px-10 py-10 mb-5",
          "text-4xl sm:text-6xl md:text-8xl",
          className
        )}
      >
        {primary}
      </p>
      <h2
        className={tm(
          "text-3xl font-semibold uppercase italic px-5 max-w-[1000px] text-center m-auto",
          "text-xl sm:text-3xl"
        )}
      >
        {secondary}
      </h2>
    </div>
  );
}
