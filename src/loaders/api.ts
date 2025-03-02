import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { exchangeLoader } from "./exchange";
import { hasUpvotedLoader } from "./hasUpvoted";
import { loginLoader } from "./login";
import { logoutLoader } from "./logout";
import { upvoteLoader } from "./upvote";
import { upvoteCountLoader } from "./upvoteCount";
import { userLoader } from "./user";

const api = {
  upvote: upvoteLoader,
  hasUpvoted: hasUpvotedLoader,
  upvoteCount: upvoteCountLoader,
  exchange: exchangeLoader,
  login: loginLoader,
  logout: logoutLoader,
  user: userLoader,
} as const;

type Api = typeof api;
export type ApiEndpoint = keyof Api;
export type ApiParams<Endpoint extends ApiEndpoint> = Parameters<Api[Endpoint]>;

export function usePrefetchedQuery<TQueryFnData>(options: UseQueryOptions<TQueryFnData>) {
  const { data, ...restQuery } = useQuery({ staleTime: 5_000, ...options });

  if (data === undefined) {
    throw new Error("`data` must be prefetched when using `usePrefetchedQuery`");
  }

  return {
    data: data as TQueryFnData,
    ...restQuery,
  };
}
