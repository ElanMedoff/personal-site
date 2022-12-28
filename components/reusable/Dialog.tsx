import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Dialog({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label
          className={tm(
            "modal-box relative border-4 border-content",
            "py-8 sm:py-12 px-6 sm:px-8",
            "border-b-0 sm:border-b-4"
          )}
        >
          {children}
        </label>
      </label>
    </>
  );
}
