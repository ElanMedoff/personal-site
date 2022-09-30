import styles from "./Skeleton.module.scss";
import { twMerge as tm } from "tailwind-merge";

export default function Skeleton({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return <div className={styles.container} style={{ width, height }} />;
}
