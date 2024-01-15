import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/styleHelpers";
import Switch from "components/reusable/Switch";
import { ThemeContext } from "pages/_app";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;

export default function Header({
  hideOnScroll = true,
}: {
  hideOnScroll?: boolean;
}) {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("up");

  // https://stackoverflow.com/a/62497293
  useEffect(() => {
    if (!hideOnScroll) return;

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
  }, [hideOnScroll, scrollDir]);

  if (APP_ENV === "screenshot") {
    return null;
  }

  return (
    <nav
      className={tm(
        "fixed left-0 z-10 py-3 border-b-2 border-neutral bg-base-100 w-full",
        scrollDir === "up" ? "top-0" : "top-[-100px]"
      )}
      style={{
        ...transitionProperties,
        transitionProperty: "top",
      }}
    >
      <div className="flex items-center justify-around sm:justify-between w-full pl-4 gap-4">
        <h3 className={tm("text-lg md:text-2xl", "font-bold cursor-pointer")}>
          <Link href="/">
            <span>
              <span className="text-base-content">
                elan
                <span className="text-primary sm:text-base-content">med</span>
              </span>
              <span className="hidden sm:inline text-primary">.dev</span>
            </span>
          </Link>
        </h3>
        <span className="cursor-pointer select-none hover:text-primary sm:hidden">
          <Link href="/bonus">bonus</Link>
        </span>
        <span className="cursor-pointer select-none hover:text-primary sm:hidden">
          <Link href="/resume">resumé</Link>
        </span>
        <span className="cursor-pointer select-none hover:text-primary sm:hidden">
          <Link href="/blog">blog</Link>
        </span>
        <Switch
          isOn={isDarkMode}
          onToggle={() => {
            setIsDarkMode?.((prev) => !prev);
          }}
          className="sm:hidden pr-4"
        />
        <div className="items-center justify-around gap-5 hidden sm:flex pr-4">
          <span className="cursor-pointer select-none hover:text-primary">
            <Link href="/bonus">bonus</Link>
          </span>
          <span className="cursor-pointer select-none hover:text-primary">
            <Link href="/resume">resumé</Link>
          </span>
          <span className="cursor-pointer select-none hover:text-primary">
            <Link href="/blog">blog</Link>
          </span>
          <div className="divider divider-horizontal mx-0" />
          <Switch
            isOn={isDarkMode}
            onToggle={() => {
              setIsDarkMode?.((prev) => !prev);
            }}
          />
        </div>
      </div>
    </nav>
  );
}
