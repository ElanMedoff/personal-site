import Link from "next/link";
import { useContext } from "react";
import { twMerge as tm } from "tailwind-merge";
import { ThemeContext } from "./Layout";

export default function Header() {
  const { enabled, setEnabledState } = useContext(ThemeContext);

  return (
    <nav className="sticky top-0 z-10 py-3 border-b-2 border-neutral bg-base-100">
      <main className="flex items-center justify-between w-full px-5">
        <h3
          className={tm(
            "text-lg md:text-2xl",
            "font-bold text-primary cursor-pointer"
          )}
        >
          <Link href="/">
            <span className="hover:text-primary-focus">
              elanmed<span className="hidden sm:inline">.dev</span>
            </span>
          </Link>
        </h3>
        <div className="flex items-center">
          <span className="hidden mr-4 text-xs sm:inline">
            check out my blog! <span className="text-lg text-primary">→</span>
          </span>
          <span className="cursor-pointer select-none hover:underline hover:text-primary-focus transition">
            <Link href="/blog">blog</Link>
          </span>
          <div className="divider divider-horizontal" />
          <input
            type="checkbox"
            className="toggle"
            onClick={() => {
              setEnabledState?.((prev) => !prev);
            }}
            checked={enabled}
          />
        </div>
      </main>
    </nav>
  );
}
