import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <div
      className={tm(
        "min-h-screen w-full max-w-6xl m-auto py-20 bg-base-100 overflow-hidden border-neutral",
        "border-x-0 lg:border-x-2"
      )}
    >
      <main className="max-w-5xl m-auto w-full px-4">{children}</main>
    </div>
  );
}
