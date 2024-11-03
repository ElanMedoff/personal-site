import { cn, WrapperProps } from "utils/style";
import { Inset } from "./Inset";
import { Copy } from "components/reusable/Copy";

export function Pill({ children, className }: WrapperProps) {
  return (
    <Copy as="div" subtext>
      <Inset
        horizontal="sm"
        vertical="xs"
        className={cn("border border-neutral rounded-full", className)}
      >
        {children}
      </Inset>
    </Copy>
  );
}
