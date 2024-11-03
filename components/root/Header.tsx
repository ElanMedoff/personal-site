import Link from "next/link";
import { useEffect, useState } from "react";
import { cn, createClassNameWrapper, transitionProperties } from "utils/style";
import { Switch } from "components/reusable/Switch";
import { useDarkMode } from "pages/_app";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;

export function Header({ hideOnScroll = true }: { hideOnScroll?: boolean }) {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
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
      className={cn(
        "fixed left-0 z-10 py-3 border-b-2 border-neutral bg-base-100 w-full",
        scrollDir === "up" ? "top-0" : "top-[-100px]"
      )}
      style={{
        ...transitionProperties,
        transitionProperty: "top",
      }}
    >
      <div className="flex items-center justify-around sm:justify-between w-full px-4 gap-6">
        <h3 className={cn("text-lg md:text-2xl", "font-bold cursor-pointer")}>
          <Link href="/">
            <span>
              <span className="text-base-content">
                e<span className="hidden sm:inline">lan</span>
                <span className="text-primary sm:text-base-content">med</span>
              </span>
              <span className="hidden sm:inline text-primary">.dev</span>
            </span>
          </Link>
        </h3>
        <div className="flex justify-between gap-4 sm:ml-auto">
          <HeaderLink>
            <Link href="/bonus">bonus</Link>
          </HeaderLink>
          <HeaderLink>
            <Link href="/resume">resumé</Link>
          </HeaderLink>
          <HeaderLink>
            <Link href="/blog">blog</Link>
          </HeaderLink>
        </div>
        <Switch
          isOn={isDarkMode}
          onToggle={() => {
            setIsDarkMode?.((prev) => !prev);
          }}
        />
      </div>
    </nav>
  );
}

const HeaderLink = createClassNameWrapper(
  "HeaderLink",
  "span",
  "cursor-pointer select-none hover:text-primary"
);
