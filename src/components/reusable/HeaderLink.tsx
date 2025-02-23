import slugify from "slugify";
import { BsLink45Deg as LinkIcon } from "react-icons/bs";
import { Dialog } from "src/components/reusable/Dialog";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { cn, transitionProperties } from "src/utils/style";
import { HTMLProps, useState } from "react";
import Spacing from "src/components/design-system/Spacing";

export function HeaderLink(props: HTMLProps<HTMLHeadingElement>) {
  const children = props.children as string;
  const [checked, setChecked] = useState(false);
  const [showDialog, setShowDialog] = useLocalStorage(
    "header-link-show-dialog",
    true
  );

  const preProcessed = children.replace(/[^a-zA-Z\s]/g, "").toLowerCase();
  const hashSlug = slugify(preProcessed);
  const modalSlug = `${hashSlug}-modal`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <>
      <a
        href={`#${hashSlug}`}
        className="group relative"
        onClick={async () => {
          if (showDialog) {
            (
              document.getElementById(modalSlug) as HTMLDialogElement
            ).showModal();
            return;
          }
          copyToClipboard();
        }}
      >
        <div id={hashSlug} className="absolute -top-24" />
        <h1
          className={cn(
            "cursor-pointer font-bold my-3 text-left inline mr-3",
            "text-xl md:text-2xl"
          )}
          {...props}
        />
        <span
          className={cn(
            "inline-block border border-base-100 py-[1px] px-[3px] rounded-full cursor-pointer relative top-[-2px]",
            "group-hover:border-neutral",
            "group-active:scale-[90%]"
          )}
          style={{
            ...transitionProperties,
            transitionProperty: "transform, border",
          }}
        >
          <LinkIcon size={20} className="inline-block" />
        </span>
      </a>
      <Dialog id={modalSlug}>
        <Spacing vertical md data-testid={`copy-url-dialog-${hashSlug}`}>
          <h2 className="text-xl sm:text-4xl font-bold">Heads up -</h2>
          <p>
            If you disable this pop-up in the future, clicking on a header will
            copy the link to your clipboard.
          </p>
          <p>
            It&apos;s a fancy URL that&apos;ll scroll to this section when the
            page loads!
          </p>
          <Spacing vertical xl>
            <form method="dialog">
              <button
                className={cn(
                  "btn btn-active text-xl lowercase font-light w-full",
                  "hover:scale-[98%] active:scale-95"
                )}
                onClick={() => {
                  copyToClipboard();
                }}
                data-testid="copy-button"
              >
                Copy
              </button>
            </form>
            <div
              className="flex gap-4 items-center"
              onClick={() => {
                setChecked((p) => !p);
                setShowDialog((p) => !p);
              }}
            >
              <div
                className={cn(
                  "w-6 h-6 border-2 border-primary rounded-md",
                  "hover:scale-90",
                  checked && "bg-primary"
                )}
                style={{
                  ...transitionProperties,
                  transitionProperty: "background-color",
                }}
              />
              <p className="text-sm select-none" data-testid="disable-button">
                disable this pop-up in the future
              </p>
            </div>
          </Spacing>
        </Spacing>
      </Dialog>
    </>
  );
}
