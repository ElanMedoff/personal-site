import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <div
      className={tm(
        "min-h-screen w-full max-w-5xl m-auto py-6 bg-base-100 overflow-hidden"
      )}
    >
      <main className="max-w-4xl m-auto w-full px-2">{children}</main>
    </div>
  );
}
