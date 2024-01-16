import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/styleHelpers";

export function FilterTagPill({
  className,
  children,
  onClick,
  selected,
}: {
  className?: string;
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <span
      className={tm(
        "cursor-pointer select-none rounded-full px-4 py-1 h-max w-max text-xs bg-base-200 border border-neutral",
        "hover:scale-95 active:scale-90",
        selected && "bg-secondary hover:bg-secondary text-secondary-content",
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
