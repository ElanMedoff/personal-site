import { HasUpvotedPayload } from "pages/api/hasUpvoted";
import { ApiResponse } from "utils/apiHelpers/types";
import { generateUrlPrefix } from "./helpers";

export default async function hasUpvotedLoader({ slug }: { slug: string }) {
  const response = await fetch(
    `${generateUrlPrefix()}/api/hasUpvoted?slug=${slug}`
  );

  const data: ApiResponse<HasUpvotedPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.hasUpvoted;
}