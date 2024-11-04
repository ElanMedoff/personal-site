import { cn, WrapperProps } from "utils/style";
import { Inset } from "components/design-system/Inset";
import { Copy } from "components/design-system/Copy";

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
