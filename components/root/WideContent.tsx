import React, { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function WideContent({ children }: { children: ReactNode }) {
  return (
    <div
      className={tm(
        "flex flex-col items-center xl:border-x-2 xl:border-neutral max-w-[1500px] m-auto overflow-hidden",
        "gap-8 sm:gap-16 md:gap-48 pt-10 lg:pt-20"
      )}
    >
      {children}
    </div>
  );
}
