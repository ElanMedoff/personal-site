import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";

const Child = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={tm(
        "text-5xl font-bold text-center uppercase md:text-7xl px-10 py-5",
        "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100vw]",
        className
      )}
    >
      {children}
    </p>
  );
};

export default function Banner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={tm(
        "relative border-black"
        /* "ml-[-5rem] sm:mr-[-5rem]", */
        /* "m-auto md:w-auto", */
      )}
    >
      <Child className={className}>{children}</Child>
      {/* hack to make the parent have the width of the child */}
      <Child className="relative invisible">{children}</Child>
    </section>
  );
}
