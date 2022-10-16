import { twMerge as tm } from "tailwind-merge";
export default function Image({
  src,
  size = "large",
}: {
  src: string;
  size: "small" | "medium" | "large";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="static image"
      src={src}
      className={tm(
        "m-auto w-[95%]",
        size === "small" && "sm:w-1/2",
        size === "medium" && "sm:w-3/4"
      )}
    />
  );
}
