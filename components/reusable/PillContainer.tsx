import { cn, WrapperProps } from "utils/style";
import Spacing from "components/design-system/Spacing";

export function PillContainer({ children, className, ...props }: WrapperProps) {
  return (
    <Spacing
      horizontal
      wrap="wrap"
      sm
      className={cn("list-none", className)}
      {...props}
    >
      {children}
    </Spacing>
  );
}
