import { hasUpvotedLoader } from "src/loaders/hasUpvoted";
import { upvoteCountLoader } from "src/loaders/upvoteCount";
import { upvoteLoader } from "src/loaders/upvote";
import { userLoader } from "src/loaders/user";
import { useRouter } from "next/router";
import { BsArrowUpCircleFill as ArrowIcon } from "react-icons/bs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cn, transitionProperties } from "src/utils/style";
import { generateQueryKey } from "src/loaders/helpers";
import { Copy } from "src/components/design-system/Copy";
import Spacing from "src/components/design-system/Spacing";

export function Upvote() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const queryClient = useQueryClient();

  // TODO: re-examine this now that I know more about react query
  const { data: hasUpvoted } = useQuery(
    generateQueryKey("hasUpvoted", [slug]),
    () => hasUpvotedLoader(slug),
    {
      staleTime: 5_000,
    },
  );
  const { data: user } = useQuery(generateQueryKey("user", []), () => userLoader(), {
    staleTime: 5_000,
  });
  const { data: upvoteCount } = useQuery(
    generateQueryKey("upvoteCount", [slug]),
    () => upvoteCountLoader(slug),
    {
      staleTime: 5_000,
    },
  );
  const { refetch: upvote } = useQuery(["upvote", slug], () => upvoteLoader(slug), {
    enabled: false,
    onSuccess: ({ hasUpvoted: newHasUpvoted, upvoteCount }) => {
      queryClient.setQueryData(["upvoteCount", slug], upvoteCount);
      queryClient.setQueryData(["hasUpvoted", slug], newHasUpvoted);
    },
  });
  const disabled = !user;

  return (
    <div
      className={cn(
        "fixed top-[100px] right-10",
        "hidden [@media(min-width:1405px)]:block",
        disabled && "tooltip tooltip-warning tooltip-left",
      )}
      data-tip="log in to upvote!"
    >
      <Spacing vertical sm items="center">
        <Copy base>upvote</Copy>
        <ArrowIcon
          size={70}
          className={cn(
            disabled ? "text-base-content" : "hover:scale-95 active:scale-[85%]",
            hasUpvoted && "text-primary",
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
        <Copy base>{upvoteCount}</Copy>
      </Spacing>
    </div>
  );
}
