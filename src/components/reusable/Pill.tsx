import { cn, WrapperProps } from "src/utils/style";
import { Inset } from "src/components/design-system/Inset";
import { Copy } from "src/components/design-system/Copy";

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
