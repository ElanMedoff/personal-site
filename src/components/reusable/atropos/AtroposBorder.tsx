import { CSSProperties } from "react";

const sharedStyles: CSSProperties = {
  overflow: "hidden",
  transformStyle: "preserve-3d",
  backfaceVisibility: "hidden",
  position: "absolute",
};

function Right({ base, color }: { base: number; color: string }) {
  return (
    <div
      className={`bg-${color}`}
      style={{
        ...sharedStyles,
        top: 0,
        right: 0,
        height: "100%",
        width: `${base}px`,
        transform: `translateZ(-${base}px) rotateY(90deg)`,
        transformOrigin: "right center",
      }}
    />
  );
}

function Left({ base, color }: { base: number; color: string }) {
  return (
    <div
      className={`bg-${color}`}
      style={{
        ...sharedStyles,
        top: 0,
        height: "100%",
        width: `${base}px`,
        transform: `translateZ(-${base}px) rotateY(-90deg)`,
        transformOrigin: "left center",
      }}
    />
  );
}

function Top({ base, color }: { base: number; color: string }) {
  return (
    <div
      className={`bg-${color}`}
      style={{
        ...sharedStyles,
        bottom: 0,
        top: 0,
        height: `${base}px`,
        width: "100%",
        transform: `translateZ(-${base}px) rotateX(90deg)`,
        transformOrigin: "center top",
      }}
    />
  );
}

function Bottom({ base, color }: { base: number; color: string }) {
  return (
    <div
      className={`bg-${color}`}
      style={{
        ...sharedStyles,
        bottom: 0,
        height: `${base}px`,
        width: "100%",
        transform: `translateZ(-${base}px) rotateX(-90deg)`,
        transformOrigin: "center bottom",
      }}
    />
  );
}

export const AtroposBorder = {
  Left,
  Right,
  Top,
  Bottom,
};
