import hasUpvotedLoader from "loaders/hasUpvotedLoader";
import upvoteCountLoader from "loaders/upvoteCountLoader";
import upvoteLoader from "loaders/upvoteLoader";
import userLoader from "loaders/userLoader";
import { useRouter } from "next/router";
import { FaArrowCircleUp } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/styleHelpers";

export default function Upvote() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const queryClient = useQueryClient();

  const { data: hasUpvoted } = useQuery(["hasUpvoted", slug], () =>
    hasUpvotedLoader({ slug })
  );
  const { data: user } = useQuery(["user"], () => userLoader());
  const { data: upvoteCount } = useQuery(["upvoteCount", slug], () =>
    upvoteCountLoader(slug)
  );
  const { refetch: upvote } = useQuery(
    ["upvote", slug],
    () => upvoteLoader(slug),
    {
      enabled: false,
      onSuccess: ({ hasUpvoted: newHasUpvoted, upvoteCount }) => {
        queryClient.setQueryData(["upvoteCount", slug], upvoteCount);
        queryClient.setQueryData(["hasUpvoted", slug], newHasUpvoted);
      },
    }
  );
  const disabled = !user;

  return (
    <div
      className={tm(
        "fixed bottom-5 left-3",
        "[@media(min-width:1405px)]:top-[200px] [@media(min-width:1405px)]:right-10 [@media(min-width:1405px)]:bottom-[unset] [@media(min-width:1405px)]:left-[unset]"
      )}
    >
      <div
        className={tm(
          "flex [@media(min-width:1405px)]:flex-col items-center",
          "border-base-content border-4 bg-base-100 p-1 rounded-xl",
          "[@media(min-width:1405px)]:border-none",
          disabled &&
            "tooltip tooltip-warning tooltip-right [@media(min-width:1405px)]:tooltip-left"
        )}
        data-tip="log in to vote!"
      >
        <FaArrowCircleUp
          size={70}
          className={tm(
            disabled
              ? "text-base-content"
              : "hover:scale-95 active:scale-[85%]",
            hasUpvoted && "text-primary"
          )}
          style={{
            ...transitionProperties,
            transitionProperty: "transform",
          }}
          onClick={() => {
            if (disabled) return;
            upvote();
          }}
        />
        <p className="p-1 text-lg">{upvoteCount}</p>
      </div>
    </div>
  );
}
