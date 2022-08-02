import { ReactNode } from "react";
import cx from "classnames";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <main
      className={cx(
        "min-h-screen w-full max-w-5xl m-auto py-6 bg-base-100",
        "px-2 md:px-20"
      )}
    >
      {children}
    </main>
  );
}
