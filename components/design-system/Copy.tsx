import {cn, Expand, OneOfUnion, WrapperProps} from "utils/style";

type Props = Expand<WrapperProps & OneOfVariant & BaseProps>;
interface BaseProps {
  as?: HTMLTagName;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
}

export const variants = ["base", "subtext"] as const;
type Variant = (typeof variants)[number];
type OneOfVariant = OneOfUnion<Variant>;

export function isVariant(variant: string): variant is Variant {
  return variants.includes(variant as Variant);
}

type HTMLTagName = "p" | "span" | "div";

export function Copy({
  as = "p",
  italic = false,
  bold = false,
  underline = false,
  children,
  className,
  ...props
}: Props) {
  const variants = Object.keys(props).filter(isVariant);
  if (variants.length > 1) {
    throw new Error("Should only pass one `size` prop!");
  }
  const variant = variants[0];
  const propsWithoutVariant = Object.fromEntries(
    Object.entries(props).filter(([prop]) => !isVariant(prop))
  );

  const Tag = as;
  const variantToSize: Record<Variant, string> = {
    base: "text-base",
    subtext: "text-xs",
  };

  return (
    <Tag
      className={cn(
        variantToSize[variant],
        {
          italic,
          "font-bold": bold,
          underline,
        },
        className
      )}
      {...propsWithoutVariant}
    >
      {children}
    </Tag>
  );
}
