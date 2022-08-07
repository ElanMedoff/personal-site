import Link from "next/link";
import cx from "classnames";

export default function Header() {
  return (
    <nav className="sticky top-0 z-10 py-3 border-b-2 border-neutral bg-base-100">
      <main className="flex items-center justify-between w-full px-5">
        <h3
          className={cx(
            "text-lg md:text-2xl",
            "font-bold text-primary cursor-pointer"
          )}
        >
          <Link href="/">elanmed.dev</Link>
        </h3>
        <div>
          <span className="hidden mr-4 text-xs sm:inline">
            check out my blog! <span className="text-lg text-primary">→</span>
          </span>
          <span className="cursor-pointer select-none hover:underline hover:text-primary transition">
            <Link href="/blog">blog</Link>
          </span>
        </div>
      </main>
    </nav>
  );
}
