import Link, { LinkProps } from "next/link";
import { anchorStyles } from "components/reusable/Anchor";
import { twMerge as tm } from "tailwind-merge";
import { ReactNode } from "react";

export default function MyLink(
  props: LinkProps & { className?: string; children: ReactNode }
) {
  return (
    <Link {...props} passHref>
      <a className={tm(anchorStyles, props.className)}>{props.children}</a>
    </Link>
  );
}
