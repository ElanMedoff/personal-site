import { Size, WrapperProps, cn } from "src/utils/style";

interface Props extends WrapperProps {
  horizontal?: Size;
  vertical?: Size;
  right?: Size;
  left?: Size;
  top?: Size;
  bottom?: Size;
}

// can't dynamically construct classnames with tailwind :/

const horizontalToSpacing: Record<Size, string> = {
  none: "px-0",
  xs: "px-1",
  sm: "px-3",
  md: "px-6",
  lg: "px-9",
  xl: "px-12",
};

const verticalToSpacing: Record<Size, string> = {
  none: "py-0",
  xs: "py-1",
  sm: "py-3",
  md: "py-6",
  lg: "py-9",
  xl: "py-12",
};

const rightToSpacing: Record<Size, string> = {
  none: "pr-0",
  xs: "pr-1",
  sm: "pr-3",
  md: "pr-6",
  lg: "pr-9",
  xl: "pr-12",
};

const leftToSpacing: Record<Size, string> = {
  none: "pl-0",
  xs: "pl-1",
  sm: "pl-3",
  md: "pl-6",
  lg: "pl-9",
  xl: "pl-12",
};

const topToSpacing: Record<Size, string> = {
  none: "pt-0",
  xs: "pt-1",
  sm: "pt-3",
  md: "pt-6",
  lg: "pt-9",
  xl: "pt-12",
};

const bottomToSpacing: Record<Size, string> = {
  none: "pb-0",
  xs: "pb-1",
  sm: "pb-3",
  md: "pb-6",
  lg: "pb-9",
  xl: "pb-12",
};

export function Inset({
  children,
  horizontal,
  vertical,
  right,
  left,
  bottom,
  top,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        horizontal && horizontalToSpacing[horizontal],
        vertical && verticalToSpacing[vertical],
        right && rightToSpacing[right],
        left && leftToSpacing[left],
        top && topToSpacing[top],
        bottom && bottomToSpacing[bottom],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
