import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "../../utils/styles";

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
        "cursor-pointer select-none rounded-full px-4 py-1 h-max w-max text-xs bg-base-200 border border-neutral",
        "hover:scale-95 active:scale-90",
        className
      )}
      onClick={onClick}
      style={{
        ...transitionProperties,
        transitionProperty: "transform",
      }}
    >
      {children}
    </span>
  );
}
