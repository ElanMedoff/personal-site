import { ReactNode } from "react";

export function Dialog({ id, children }: { id: string; children: ReactNode }) {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box border-6 border-neutral p-10">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
