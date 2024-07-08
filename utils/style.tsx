import { CSSProperties, ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export const transitionProperties: CSSProperties = {
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
};

type HTMLTagName =
  | "div"
  | "p"
  | "span"
  | "article"
  | "section"
  | "ul"
  | "h1"
  | "h2"
  | "h3";

export function createClassNameWrapper(
  name: string,
  as: HTMLTagName,
  wrapperClassName: string
) {
  const Tag = as;
  const Wrapper = ({
    children,
    className,
    ...rest
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    return (
      <Tag className={tm(wrapperClassName, className)} {...rest}>
        {children}
      </Tag>
    );
  };
  Wrapper.displayName = name;
  return Wrapper;
}
