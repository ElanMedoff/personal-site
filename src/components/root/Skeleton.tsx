interface SharedProps {
  width: number;
}

interface SquareProps extends SharedProps {
  square: boolean;
  height?: never;
}

interface HeightProps extends SharedProps {
  height: number;
  square?: never;
}

export function Skeleton({ width, height, square }: SquareProps | HeightProps) {
  return (
    <div
      className="animate-pulse bg-base-300"
      style={{
        maxWidth: width,
        ...(square ? { aspectRatio: "1/1" } : { height }),
      }}
    />
  );
}
