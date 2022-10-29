import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Pill({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick: (args: any) => void;
}) {
  return (
    <span
      className={tm(
        "cursor-pointer select-none rounded-full px-4 py-1 h-max w-max text-xs bg-base-200 transition border border-neutral",
        "hover:bg-base-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
