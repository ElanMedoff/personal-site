import React from "react";
import { twMerge as tm } from "tailwind-merge";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Switch({ onToggle }: { onToggle: () => void }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className={tm(
        "w-[50px] h-[30px] flex rounded-full p-[4px] cursor-pointer bg-base-100 border border-neutral",
        isOn ? "justify-end" : "justify-start"
      )}
      onClick={() => {
        setIsOn((p) => !p);
        onToggle();
      }}
    >
      <motion.div
        className="w-5 h-5 bg-base-content rounded-full"
        /* layout */
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      />
    </div>
  );
}
