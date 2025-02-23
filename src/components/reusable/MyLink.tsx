import Link, { LinkProps } from "next/link";
import { anchorStyles } from "src/components/reusable/Anchor";
import { ReactNode } from "react";
import { cn } from "src/utils/style";

export type MyLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
};

export function MyLink(props: MyLinkProps) {
  return (
    <Link {...props} passHref>
      <a className={cn(anchorStyles, props.className)}>{props.children}</a>
    </Link>
  );
}
