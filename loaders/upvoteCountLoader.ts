import { UpvoteCountPayload } from "pages/api/upvoteCount";
import { ApiResponse } from "utils/apiHelpers/types";
import { generateUrlPrefix } from "./helpers";

export default async function upvoteCountLoader(slug: string) {
  const response = await fetch(
    `${generateUrlPrefix()}/api/upvoteCount?slug=${slug}`
  );

  const data: ApiResponse<UpvoteCountPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.upvoteCount;
}
