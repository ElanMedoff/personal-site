import { ReactNode } from "react";

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
        <label className="modal-box relative py-12 px-8 border-4 border-content">
          {children}
        </label>
      </label>
    </>
  );
}
