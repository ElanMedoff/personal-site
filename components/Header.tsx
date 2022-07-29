import Link from "next/link";
import cx from "classnames";

export default function Header() {
  return (
    <nav className="border-b-2 border-neutral py-3 sticky top-0 bg-base-100 z-10">
      <main className="flex justify-between items-center w-full px-5">
        <h3
          className={cx(
            "text-lg md:text-2xl",
            "font-bold text-primary cursor-pointer"
          )}
        >
          <Link href="/">elanmed.dev</Link>
        </h3>
        <p className="hover:underline cursor-pointer hover:text-primary transition select-none">
          <Link href="/blog">blog</Link>
        </p>
      </main>
    </nav>
  );
}
