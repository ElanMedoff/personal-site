import cx from "classnames";

export default function Header() {
  return (
    <nav className="border-b-2 border-black py-3 sticky top-0 bg-base-100">
      <main className="flex justify-between items-center w-full max-w-7xl m-auto px-2">
        <h3 className={cx("text-xl md:text-2xl", "font-bold")}>elanmed.dev</h3>
        <div className={cx("flex text-md items-center", "gap-2 lg:gap-8")}>
          <p>blog</p>
          <p>about</p>
        </div>
      </main>
    </nav>
  );
}
