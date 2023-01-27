export default function AtroposImage({
  src,
  alt,
  offset,
  className,
  placeholderDimensions,
}: {
  src: string;
  alt: string;
  offset: number;
  className?: string;
  placeholderDimensions?: { width: number; height: number };
}) {
  // Atropos has issues with next's Image
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-atropos-offset={offset}
      width={placeholderDimensions?.width}
      height={placeholderDimensions?.height}
    />
  );
}
