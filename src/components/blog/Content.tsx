import { ReactNode } from "react";
import { cn } from "src/utils/style";

export function Content({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "min-h-screen w-full max-w-6xl m-auto bg-base-100 border-neutral",
        "py-20 lg:py-28 border-x-0 lg:border-x-2",
      )}
      data-testid="content"
    >
      <main className="max-w-5xl m-auto w-full px-4">{children}</main>
    </div>
  );
}
