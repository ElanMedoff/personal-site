import slugify from "slugify";
import { twMerge as tm } from "tailwind-merge";
import { BsLink45Deg as LinkIcon } from "react-icons/bs";
import { Dialog } from "components/reusable/Dialog";
import { useLocalStorage } from "hooks/useLocalStorage";
import { transitionProperties } from "utils/style";
import { useRouter } from "next/router";
import { HTMLProps, useState } from "react";
import Spacing from "./Spacing";

export function HeaderLink(props: HTMLProps<HTMLHeadingElement>) {
  const children = props.children as string;
  const [checked, setChecked] = useState(false);
  const [showDialog, setShowDialog] = useLocalStorage(
    "header-link-show-dialog",
    true
  );
  const router = useRouter();

  const preProcessed = children.replace(/[^a-zA-Z\s]/g, "").toLowerCase();
  const slug = slugify(preProcessed);

  const copyToClipboard = async () => {
    const url = new URL(window.location.href);
    url.hash = slug;
    router.push(url, undefined, { shallow: true });
    await navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <>
      <label
        className="group"
        onClick={async () => {
          if (showDialog) return;
          await copyToClipboard();
        }}
        data-locationhash={slug}
        htmlFor={showDialog ? slugify(children) : undefined}
      >
        <h1
          className={tm(
            "cursor-pointer font-bold my-3 text-left inline mr-3",
            "text-xl md:text-2xl"
          )}
          {...props}
        />
        <span
          className={tm(
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
      </label>
      <Dialog id={slugify(children)}>
        <Spacing vertical md data-testid={`copy-url-dialog-${slug}`}>
          <h2 className="text-xl sm:text-4xl font-bold">Heads up -</h2>
          <p>
            If you disable this pop-up in the future, clicking on a header will
            copy the link to your clipboard.
          </p>
          <p>
            It&apos;s a fancy URL that&apos;ll scroll to this section when the
            page loads!
          </p>

          <label
            className={tm(
              "btn btn-active text-xl lowercase font-light",
              "hover:scale-[98%] active:scale-95"
            )}
            htmlFor={slugify(children)}
            onClick={async () => {
              await copyToClipboard();
            }}
            data-testid="copy-button"
          >
            Copy
          </label>
          <div
            className="flex gap-4 items-center"
            onClick={() => {
              setChecked((p) => !p);
              setShowDialog((p) => !p);
            }}
          >
            <div
              className={tm(
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
      </Dialog>
    </>
  );
}
