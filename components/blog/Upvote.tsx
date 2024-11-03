import { hasUpvotedLoader } from "loaders/hasUpvoted";
import { upvoteCountLoader } from "loaders/upvoteCount";
import { upvoteLoader } from "loaders/upvote";
import { userLoader } from "loaders/user";
import { useRouter } from "next/router";
import { BsArrowUpCircleFill as ArrowIcon } from "react-icons/bs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/style";
import { generateQueryKey } from "loaders/helpers";

export function Upvote() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const queryClient = useQueryClient();

  const { data: hasUpvoted } = useQuery(
    generateQueryKey("hasUpvoted", [slug]),
    () => hasUpvotedLoader(slug),
    {
      staleTime: 5_000,
    }
  );
  const { data: user } = useQuery(
    generateQueryKey("user", []),
    () => userLoader(),
    {
      staleTime: 5_000,
    }
  );
  const { data: upvoteCount } = useQuery(
    generateQueryKey("upvoteCount", [slug]),
    () => upvoteCountLoader(slug),
    {
      staleTime: 5_000,
    }
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
          "flex [@media(min-width:1405px)]:flex-col items-center gap-1",
          "border-primary border-4 bg-base-100 p-1 rounded-xl",
          "[@media(min-width:1405px)]:border-none",
          disabled &&
            "tooltip tooltip-warning tooltip-right [@media(min-width:1405px)]:tooltip-left"
        )}
        data-tip="log in to upvote!"
      >
        <p className="hidden [@media(min-width:1405px)]:block">upvote</p>
        <ArrowIcon
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
        <p className="p-2 text-lg">{upvoteCount}</p>
      </div>
    </div>
  );
}
