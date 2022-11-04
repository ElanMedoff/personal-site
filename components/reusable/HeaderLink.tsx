import slugify from "slugify";
import { twMerge as tm } from "tailwind-merge";
import { BsLink45Deg as LinkIcon } from "react-icons/bs";
import Dialog from "./Dialog";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { transitionProperties } from "../../utils/styles";
import { useRouter } from "next/router";

export default function HeaderLink(props: any) {
  const uuid = uuidv4();
  const [showDialog, setShowDialog] = useLocalStorage(
    "header-link-show-dialog",
    true
  );
  const router = useRouter();

  const preProcessed = props.children
    .replace(/([0-9]|\.|:)/g, "")
    .toLowerCase();
  const slug = slugify(preProcessed);

  return (
    <>
      <label
        className="group"
        onClick={async () => {
          const url = new URL(window.location.href);
          url.hash = slug;
          router.push(url, undefined, { shallow: true });
          await navigator.clipboard.writeText(window.location.toString());
        }}
        // override native id to use our own scrolling on load
        data-locationhash={slug}
        htmlFor={showDialog ? uuid : undefined}
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
      <Dialog uuid={uuid}>
        <div className="flex flex-col gap-6 sm:gap-8">
          <h2 className="text-xl sm:text-4xl font-bold">Heads up -</h2>
          <p>
            Clicking on a header will copy the link to your clipboard! It&apos;s
            a fancy URL that&apos;ll scroll to this section when the page loads.
          </p>
          <div className="flex gap-4 items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={(e) => setShowDialog(!e.target.checked)}
            />
            <p className="italic text-sm">disable this pop-up in the future</p>
          </div>
        </div>
      </Dialog>
    </>
  );
}
