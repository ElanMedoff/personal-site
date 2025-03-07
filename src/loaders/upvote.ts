import { generateUrlPrefix } from "src/loaders/helpers";
import { UpvotePayload } from "src/pages/api/upvote";
import { ApiResponse } from "src/utils/api/types";

export async function upvoteLoader(slug: string) {
  const response = await fetch(`${generateUrlPrefix()}/api/upvote?slug=${slug}`, {
    method: "POST",
  });

  const data: ApiResponse<UpvotePayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  const { upvoteCount, hasUpvoted } = data.payload;
  return {
    upvoteCount,
    hasUpvoted,
  };
}
