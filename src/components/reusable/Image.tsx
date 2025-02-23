import NextImage from "next/image";
import { isVisualRegressionTest } from "src/utils/env";
import { cn } from "src/utils/style";

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
      className={cn(
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
        loading={isVisualRegressionTest() ? "eager" : "lazy"}
      />
    </div>
  );
}
