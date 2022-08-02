export default function AtroposImage({
  file,
  alt,
  offset,
  className,
}: {
  file: string;
  alt: string;
  offset: number;
  className?: string;
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
      className={className}
      data-atropos-offset={offset}
    />
  );
}
