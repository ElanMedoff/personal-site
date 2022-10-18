import { twMerge as tm } from "tailwind-merge";
import React, { ReactNode } from "react";
import Divider from "./reusable/Divider";
import { motion } from "framer-motion";
import { onScrollProps } from "../utils/framer";

export default function Banner({ primary }: { primary: ReactNode }) {
  return (
    <div className="w-full mb-5">
      <Divider />
      <motion.p
        {...onScrollProps}
        className={tm(
          "font-bold text-center uppercase px-5 pt-10 m-auto underline decoration-[15px] decoration-primary",
          "text-4xl sm:text-6xl md:text-8xl",
          "mb-10 md:mb-20"
        )}
      >
        {primary}
      </motion.p>
    </div>
  );
}
