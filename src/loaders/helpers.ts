import { ApiEndpoint, ApiParams } from "./api";
import { isProd } from "src/utils/env";

export const generateUrlPrefix = () => {
  // necessary to fetch on the server
  return isProd() ? "https://elanmed.dev" : "http://localhost:3001";
};

export const generateQueryKey = <Endpoint extends ApiEndpoint>(
  endpoint: Endpoint,
  params: ApiParams<Endpoint>,
) => {
  return [endpoint, ...params] as const;
};
