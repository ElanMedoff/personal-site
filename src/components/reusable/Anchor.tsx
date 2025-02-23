import { cn, transitionProperties, WrapperProps } from "src/utils/style";

const anchorStyles = "underline underline-offset-2 hover:underline-offset-4";

interface Props extends WrapperProps {
  href: string;
}

export function Anchor({ href, children, className }: Props) {
  return (
    <a
      href={href}
      className={cn(anchorStyles, className)}
      style={{
        transitionProperty: "text-underline-offset",
        ...transitionProperties,
      }}
    >
      {children}
    </a>
  );
}

export { anchorStyles };
