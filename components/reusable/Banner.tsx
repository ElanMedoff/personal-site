import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { generateOnScrollProps } from "utils/framer";
import { cn } from "utils/style";

export function BannerText({
  children,
  reverse,
}: {
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <motion.p
      {...generateOnScrollProps}
      className={cn(
        "uppercase",
        "px-0 sm:px-6",
        "font-bold  w-full text-center",
        "text-4xl sm:text-6xl lg:text-8xl",
        reverse ? "md:text-right pr-6 sm:pr-12" : "md:text-left pr-6 sm:pl-12"
      )}
    >
      {children}
    </motion.p>
  );
}

export function BannerBorder() {
  return (
    <div className="border-b-[15px] sm:border-b-[35px] border-primary mb-10 md:mb-20" />
  );
}
