import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Info({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={tm(
        "rounded-2xl bg-info text-info-content px-6 py-1 my-6 shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
