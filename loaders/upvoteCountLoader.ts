import { UpvoteCountPayload } from "pages/api/upvoteCount";
import { ApiResponse } from "utils/apiHelpers/types";
import { generateUrlPrefix } from "./helpers";

export async function upvoteCountLoader(
  slug: string,
  getServerSidePropsCookie?: string
) {
  const headers = new Headers();
  if (getServerSidePropsCookie) {
    headers.append("Cookie", `sessionId=${getServerSidePropsCookie}`);
  }
  const response = await fetch(
    `${generateUrlPrefix()}/api/upvoteCount?slug=${slug}`,
    { headers }
  );

  const data: ApiResponse<UpvoteCountPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.upvoteCount;
}
