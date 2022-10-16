import React, { useEffect } from "react";
import { twMerge as tm } from "tailwind-merge";
import { motion, useAnimationControls } from "framer-motion";

export default function Switch({
  onToggle,
  isOn,
}: {
  onToggle: () => void;
  isOn: boolean;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (isOn) {
      controls.start({ x: 20 });
    } else {
      controls.start({ x: 0 });
    }
  }, [controls, isOn]);

  return (
    <motion.div
      className={tm(
        "w-[50px] h-[30px] flex rounded-full p-[4px] cursor-pointer bg-base-100 border border-neutral"
      )}
      onClick={() => {
        onToggle();
      }}
    >
      <motion.div
        className="w-5 h-5 bg-base-content rounded-full"
        animate={controls}
      />
    </motion.div>
  );
}
