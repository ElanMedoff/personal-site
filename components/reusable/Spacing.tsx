import { twMerge as tm } from "tailwind-merge";
import { ReactNode } from "react";

type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
type OneOfUnion<Union extends string> = {
  [Key in Union]: Expand<
    { [_ in Key]: true } & Partial<Record<Exclude<Union, Key>, never>>
  >;
}[Union];

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type OneOfSize = OneOfUnion<Size>;
type Direction = "horizontal" | "vertical";
type OneOfDirection = OneOfUnion<Direction>;

type Props = Expand<
  OneOfSize &
    OneOfDirection & {
      children: ReactNode;
      className?: string;
    } & React.HTMLAttributes<HTMLDivElement>
>;

const sizeToSpacing: Record<Size, string> = {
  xs: "gap-1",
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-9",
  xl: "gap-12",
};
const sizes: Size[] = ["xs", "sm", "md", "lg", "xl"];

export default function Spacing(props: Props) {
  const size = Object.keys(props)
    .filter((propKey) => sizes.includes(propKey as Size))
    .find((propKey) => props[propKey as Size])!;

  const restProps = Object.fromEntries(
    Object.entries(props).filter(
      ([propKey]) =>
        !sizes.includes(propKey as Size) &&
        propKey !== "horizontal" &&
        propKey !== "vertical" &&
        propKey !== "children"
    )
  );
  return (
    <div
      className={tm(
        "flex",
        props.horizontal ? "flex-row" : "flex-col",
        sizeToSpacing[size as Size],
        props.className ?? ""
      )}
      {...restProps}
    >
      {props.children}
    </div>
  );
}
