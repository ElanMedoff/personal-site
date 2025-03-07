import { ReactNode } from "react";
import { cn, transitionProperties } from "src/utils/style";

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
      className={cn(
        "cursor-pointer select-none rounded-full px-4 py-1 h-max w-max text-xs bg-base-200 border border-neutral",
        "hover:scale-95 active:scale-90",
        selected && "bg-secondary hover:bg-secondary text-secondary-content",
        className,
      )}
      onClick={onClick}
      style={{
        ...transitionProperties,
        transitionProperty: "scale",
      }}
    >
      {children}
    </span>
  );
}
