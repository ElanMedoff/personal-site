import Link from "next/link";
import cx from "classnames";

export default function Header() {
  return (
    <nav className="border-b-2 border-neutral py-3 sticky top-0 bg-base-100 z-10">
      <main className="flex justify-between items-center w-full max-w-7xl m-auto px-4 md:px-10">
        <h3
          className={cx(
            "text-lg md:text-2xl",
            "font-bold text-primary cursor-pointer"
          )}
        >
          <Link href="/blog">elanmed.dev</Link>
        </h3>
        <div className={cx("flex text-md items-center", "gap-2 lg:gap-8")}>
          <p className="hover:underline cursor-pointer hover:text-secondary transition">
            <Link href="/blog">blog</Link>
          </p>

          <p className="hover:underline cursor-pointer hover:text-secondary transition">
            <Link href="/about">about</Link>
          </p>
        </div>
      </main>
    </nav>
  );
}
