import { twMerge as tm } from "tailwind-merge";
import NextImage from "next/image";

export function Image({
  src,
  width,
  height,
  size = "large",
}: {
  src: string;
  width: number;
  height: number;
  size: "small" | "medium" | "large";
}) {
  return (
    <div
      className={tm(
        "m-auto w-[95%]",
        size === "small" && "sm:w-1/2",
        size === "medium" && "sm:w-3/4"
      )}
    >
      <NextImage
        alt="static image"
        src={src}
        width={width}
        height={height}
        layout="responsive"
      />
    </div>
  );
}
