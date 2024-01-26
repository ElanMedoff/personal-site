import getConfig from "next/config";
import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;

export function Content({ children }: { children: ReactNode }) {
  return (
    <div
      className={tm(
        "min-h-screen w-full max-w-6xl m-auto bg-base-100 border-neutral",
        APP_ENV === "screenshot"
          ? "pt-6"
          : "py-20 lg:py-28 border-x-0 lg:border-x-2"
      )}
      data-testid="content"
    >
      <main className="max-w-5xl m-auto w-full px-4">{children}</main>
    </div>
  );
}
