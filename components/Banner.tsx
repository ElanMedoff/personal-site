import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { generateOnScrollProps } from "../utils/framer";

export default function Banner({
  primary,
  reverse,
}: {
  primary: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="w-full mb-5">
      <motion.p
        {...generateOnScrollProps()}
        className={tm(
          "font-bold text-center uppercase px-5 pt-10 w-full",
          "text-4xl sm:text-6xl md:text-7xl lg:text-8xl",
          "mb-10 md:mb-20",
          "border-b-[15px] sm:border-b-[40px] border-primary",
          reverse ? "text-right pr-5 sm:pr-10" : "text-left pr-5 sm:pl-10"
        )}
      >
        {primary}
      </motion.p>
    </div>
  );
}
