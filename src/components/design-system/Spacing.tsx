import { Expand, OneOfUnion, Size, WrapperProps, cn, isSize } from "src/utils/style";

type OneOfSize = OneOfUnion<Size>;
type Direction = "horizontal" | "vertical";
type OneOfDirection = OneOfUnion<Direction>;

interface RestProps {
  justify?: Justify;
  items?: Items;
  wrap?: Wrap;
}
type Props = Expand<OneOfSize & OneOfDirection & WrapperProps & RestProps>;

type Justify = "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch";

type Wrap = "wrap" | "wrap-reverse";

type Items = "start" | "end" | "center" | "baseline" | "stretch";

const wrapToClass: Record<Wrap, string> = {
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

const justifyToClass: Record<Justify, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
  stretch: "justify-stretch",
};

const itemsToClass: Record<Items, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const sizeToSpacing: Record<Size, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-9",
  xl: "gap-12",
};

export function Spacing({
  children,
  className,
  justify,
  items,
  wrap,
  horizontal,
  vertical,
  ...props
}: Props) {
  const sizes = Object.keys(props).filter(isSize);
  if (sizes.length > 1) {
    throw new Error("Should only pass one `size` prop!");
  }
  const size = sizes[0];
  const propsWithoutSize = Object.fromEntries(
    Object.entries(props).filter(([prop]) => !isSize(prop)),
  );

  return (
    <div
      className={cn(
        "flex",
        horizontal ? "flex-row" : vertical ? "flex-col" : "",
        sizeToSpacing[size],
        items && itemsToClass[items],
        justify && justifyToClass[justify],
        wrap && wrapToClass[wrap],
        className,
      )}
      {...propsWithoutSize}
    >
      {children}
    </div>
  );
}
