import { CSSProperties, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
export type OneOfUnion<Union extends string> = {
  [Key in Union]: Expand<{ [_ in Key]: true } & Partial<Record<Exclude<Union, Key>, never>>>;
}[Union];
export function isSize(size: string): size is Size {
  return sizes.includes(size as Size);
}
export const sizes = ["none", "xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof sizes)[number];

export const transitionProperties: CSSProperties = {
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
};

type HTMLTagName = "div" | "p" | "span" | "article" | "section" | "ul" | "h1" | "h2" | "h3";

export function createClassNameWrapper(name: string, as: HTMLTagName, wrapperClassName: string) {
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
      <Tag className={cn(wrapperClassName, className)} {...rest}>
        {children}
      </Tag>
    );
  };
  Wrapper.displayName = name;
  return Wrapper;
}

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export interface WrapperProps {
  children: ReactNode;
  className?: string;
}
