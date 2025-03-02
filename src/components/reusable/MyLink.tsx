import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { anchorStyles } from "src/components/reusable/Anchor";
import { cn } from "src/utils/style";

export type MyLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
};

export function MyLink(props: MyLinkProps) {
  return (
    <Link {...props} className={cn(anchorStyles, props.className)}>
      {props.children}
    </Link>
  );
}
