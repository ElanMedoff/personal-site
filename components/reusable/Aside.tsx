import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Aside({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={tm(
        "italic text-sm rounded-2xl bg-base-200 px-6 py-1 my-6 shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
