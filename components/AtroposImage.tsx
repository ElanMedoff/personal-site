export default function AtroposImage({
  file,
  alt,
  width,
  height,
}: {
  file: string;
  alt: string;
  width: number;
  height: number;
}) {
  // Atropos has issues with next's Image
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://elanmed.dev"
        }/${file}`}
      alt={alt}
      className={`min-w-[${width}px] min-h-[${height}px]`}
    />
  );
}
