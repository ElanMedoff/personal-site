import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Dialog({
  uuid,
  children,
}: {
  uuid: string;
  children: ReactNode;
}) {
  return (
    <>
      <input type="checkbox" id={uuid} className="modal-toggle" />
      <label
        htmlFor={uuid}
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label
          className={tm(
            "modal-box relative border-4 border-content",
            "py-8 sm:py-12 px-6 sm:px-8"
          )}
        >
          {children}
        </label>
      </label>
    </>
  );
}
