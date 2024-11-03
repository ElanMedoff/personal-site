import { ReactNode } from "react";
import { cn } from "utils/style";

export function Info({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-info text-info-content px-6 py-1 my-6",
        className
      )}
    >
      {children}
    </div>
  );
}
