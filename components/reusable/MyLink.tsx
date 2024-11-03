import Link, { LinkProps } from "next/link";
import { anchorStyles } from "components/reusable/Anchor";
import { ReactNode } from "react";
import { cn } from "utils/style";

export function MyLink(
  props: LinkProps & { className?: string; children: ReactNode }
) {
  return (
    <Link {...props} passHref>
      <a className={cn(anchorStyles, props.className)}>{props.children}</a>
    </Link>
  );
}
