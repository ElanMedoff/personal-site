import NextImage from "next/image";
import { ImgHTMLAttributes } from "react";

export default function Image({
  src,
  width,
  height,
  className,
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className={className}>
      <NextImage
        alt="static image"
        src={src ?? ""}
        width={width}
        height={height}
        layout="responsive"
      />
    </div>
  );
}
