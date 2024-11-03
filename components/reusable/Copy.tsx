import { cn, Expand, OneOfUnion, WrapperProps } from "utils/style";

type Variant = "base" | "subtext";
type OneOfVariant = OneOfUnion<Variant>;
type Props = Expand<WrapperProps & OneOfVariant & BaseProps>;
interface BaseProps {
  as?: HTMLTagName;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
}

type HTMLTagName = "p" | "span" | "div";

export function Copy({
  as = "p",
  italic = false,
  bold = false,
  underline = false,
  children,
  className,
  subtext,
  ...rest
}: Props) {
  const Tag = as;
  const variantToSize: Record<Variant, string> = {
    base: "text-base",
    subtext: "text-xs",
  };

  return (
    <Tag
      className={cn(
        {
          italic,
          "font-bold": bold,
          underline,
        },
        variantToSize.base, // default
        subtext && variantToSize.subtext,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
