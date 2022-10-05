import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { ThemeContext } from "./Layout";

export default function Header() {
  const { enabled, setEnabledState } = useContext(ThemeContext);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("up");

  // https://stackoverflow.com/a/62497293
  useEffect(() => {
    const threshold = 20;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <nav
      className={tm(
        "fixed left-0 z-10 py-3 border-b-2 border-neutral bg-base-100 w-full transition-all duration-[400ms]",
        scrollDir === "up" ? "top-0" : "top-[-100px]"
      )}
    >
      <main className="flex items-center justify-between w-full px-5">
        <h3 className={tm("text-lg md:text-2xl", "font-bold cursor-pointer")}>
          <Link href="/">
            <span>
              elanmed
              <span className="hidden sm:inline text-primary">.dev</span>
            </span>
          </Link>
        </h3>
        <div className="flex items-center">
          <span className="cursor-pointer select-none hover:underline hover:text-primary transition">
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
            // onClick is more consistent for first load, but need onChange to suppress warning
            onChange={() => {}}
          />
        </div>
      </main>
    </nav>
  );
}
