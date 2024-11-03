import { cn, createClassNameWrapper } from "utils/style";

export const WideContent = createClassNameWrapper(
  "WideContent",
  "div",
  cn(
    "flex flex-col items-center xl:border-x-2 xl:border-neutral max-w-[1500px] m-auto overflow-hidden",
    "gap-8 sm:gap-16 md:gap-48 py-20 lg:py-28"
  )
);
