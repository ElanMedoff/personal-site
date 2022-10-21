import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";
import Divider from "./reusable/Divider";
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
      <Divider />
      <motion.p
        {...generateOnScrollProps()}
        className={tm(
          "font-bold text-center uppercase px-5 pt-10",
          "text-4xl sm:text-6xl md:text-8xl",
          "mb-10 md:mb-20",
          "w-full",
          "border-b-[15px] sm:border-b-[40px] border-primary",
          reverse ? "text-right" : "text-left"
        )}
      >
        {primary}
      </motion.p>
    </div>
  );
}
