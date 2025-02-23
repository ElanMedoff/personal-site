import React from "react";
import { BsSun as SunIcon, BsMoon as MoonIcon } from "react-icons/bs";
import { cn } from "src/utils/style";

export function Switch({
  onToggle,
  isOn,
  className,
}: {
  onToggle: () => void;
  isOn: boolean;
  className?: string;
}) {
  return (
    <label
      className={cn("swap swap-rotate", isOn ? "swap-active" : "", className)}
      onClick={onToggle}
    >
      <SunIcon size={25} className="swap-on" />
      <MoonIcon size={25} className="swap-off" />
    </label>
  );
}
