import { ReactNode } from "react";
import { Expand, OneOfUnion, WrapperProps, cn } from "src/utils/style";

type Props = Expand<WrapperProps & BaseProps & OneOfVariant>;
interface BaseProps {
  children: ReactNode;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
}

export const variants = ["sm", "base", "lg", "xl"] as const;
type Variant = (typeof variants)[number];
type OneOfVariant = OneOfUnion<Variant>;

export function isVariant(variant: string): variant is Variant {
  return variants.includes(variant as Variant);
}

export function Heading({
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
    Object.entries(props).filter(([prop]) => !isVariant(prop)),
  );

  const variantToSize: Record<Variant, string> = {
    sm: "text-xl",
    base: "text-xl sm:text-2xl font-semibold",
    lg: "text-3xl sm:text-4xl font-semibold",
    xl: "text-4xl sm:text-5xl font-semibold",
  };
  const Tag = props.lg ? "h1" : props.base ? "h2" : "h3";

  return (
    <Tag
      className={cn(
        variantToSize[variant],
        {
          italic,
          underline,
          "font-bold": bold,
        },
        className,
      )}
      {...propsWithoutVariant}
    >
      {children}
    </Tag>
  );
}
