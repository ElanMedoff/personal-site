import { isProd } from "utils/envHelpers";

export const generateUrlPrefix = () => {
  // necessary to fetch on the server
  return isProd() ? "https://elanmed.dev" : "http://localhost:3000";
};
