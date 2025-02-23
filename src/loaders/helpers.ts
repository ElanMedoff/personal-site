import { isProd } from "src/utils/env";

export const generateUrlPrefix = () => {
  // necessary to fetch on the server
  return isProd() ? "https://elanmed.dev" : "http://localhost:3001";
};

export type Endpoint =
  | "exchange"
  | "hasUpvoted"
  | "login"
  | "logout"
  | "upvote"
  | "upvoteCount"
  | "user";

export const generateQueryKey = (endpoint: Endpoint, params: unknown[]) => {
  return [endpoint, ...params];
};
