import React from "react";
import cx from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Switch.module.scss";

// https://www.framer.com/docs/examples/
export default function Switch({ onToggle }: { onToggle?: () => void }) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
    onToggle?.();
  };

  return (
    <div className={styles.switch} data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout transition={spring} />
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 35,
};
