import { useRouter } from "next/router";
import { BsArrowUpCircleFill as ArrowIcon } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { hasUpvotedLoader } from "src/loaders/hasUpvoted";
import { upvoteCountLoader } from "src/loaders/upvoteCount";
import { upvoteLoader } from "src/loaders/upvote";
import { userLoader } from "src/loaders/user";
import { cn, transitionProperties } from "src/utils/style";
import { generateQueryKey } from "src/loaders/helpers";
import { Copy } from "src/components/design-system/Copy";
import Spacing from "src/components/design-system/Spacing";
import { UpvotePayload } from "src/pages/api/upvote";
import { usePrefetchedQuery } from "src/loaders/api";

export function Upvote() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const queryClient = useQueryClient();

  const { data: hasUpvoted } = usePrefetchedQuery({
    queryKey: generateQueryKey("hasUpvoted", [slug]),
    queryFn: () => hasUpvotedLoader(slug),
  });
  const { data: user } = usePrefetchedQuery({
    queryKey: generateQueryKey("user", []),
    queryFn: () => userLoader(),
  });
  const { data: upvoteCount } = usePrefetchedQuery({
    queryKey: generateQueryKey("upvoteCount", [slug]),
    queryFn: () => upvoteCountLoader(slug),
  });

  interface TVariables {
    currHasUpvoted: boolean;
    currUpvoteCount: number;
  }
  interface TContext {
    prevHasUpvoted: unknown;
    prevUpvoteCount: unknown;
  }
  const { mutate: upvote } = useMutation<UpvotePayload, unknown, TVariables, TContext>({
    mutationFn: () => upvoteLoader(slug),
    onMutate: async ({ currHasUpvoted, currUpvoteCount }) => {
      await queryClient.cancelQueries({ queryKey: generateQueryKey("upvoteCount", [slug]) });
      await queryClient.cancelQueries({ queryKey: generateQueryKey("hasUpvoted", [slug]) });

      const prevUpvoteCount = queryClient.getQueryData(generateQueryKey("upvoteCount", [slug]));
      const prevHasUpvoted = queryClient.getQueryData(generateQueryKey("hasUpvoted", [slug]));

      const newUpvoteCount = currUpvoteCount + (currHasUpvoted ? -1 : 1);
      queryClient.setQueryData(["upvoteCount", slug], newUpvoteCount);
      queryClient.setQueryData(["hasUpvoted", slug], !currHasUpvoted);

      return { prevUpvoteCount, prevHasUpvoted };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(generateQueryKey("upvoteCount", [slug]), context.prevHasUpvoted);
      queryClient.setQueryData(generateQueryKey("hasUpvoted", [slug]), context.prevHasUpvoted);
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
        <Copy base className="select-none">
          upvote
        </Copy>
        <ArrowIcon
          data-testid="upvote-icon"
          size={70}
          className={cn(
            disabled ? "text-base-content" : "hover:scale-95 active:scale-[85%]",
            hasUpvoted && "text-primary",
          )}
          style={{
            ...transitionProperties,
            transitionProperty: "scale",
          }}
          onClick={() => {
            if (disabled) return;
            upvote({
              currHasUpvoted: hasUpvoted,
              currUpvoteCount: upvoteCount,
            });
          }}
          aria-disabled={disabled}
        />
        <Copy base className="select-none" data-testid="upvote-count">
          {upvoteCount}
        </Copy>
      </Spacing>
    </div>
  );
}
