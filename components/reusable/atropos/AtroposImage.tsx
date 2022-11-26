export default function AtroposImage({
  src,
  alt,
  offset,
  className,
}: {
  src: string;
  alt: string;
  offset: number;
  className?: string;
}) {
  // Atropos has issues with next's Image
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-atropos-offset={offset}
    />
  );
}
