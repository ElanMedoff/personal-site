import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { generateOnScrollProps } from "utils/framer";
import { borderClassNames } from "pages";
import { cn } from "utils/style";

export function Banner({
  primary,
  reverse,
}: {
  primary: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="w-full mb-5">
      <motion.p
        {...generateOnScrollProps}
        className={cn(
          "font-bold px-0 sm:px-5 w-full text-center",
          "text-4xl sm:text-6xl md:text-7xl lg:text-8xl",
          "mb-10 md:mb-20",
          borderClassNames,
          reverse ? "md:text-right pr-5 sm:pr-10" : "md:text-left pr-5 sm:pl-10"
        )}
      >
        {primary}
      </motion.p>
    </div>
  );
}
