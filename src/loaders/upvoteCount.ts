import { generateUrlPrefix } from "src/loaders/helpers";
import { UpvoteCountPayload } from "src/pages/api/upvoteCount";
import { ApiResponse } from "src/utils/api/types";

export async function upvoteCountLoader(slug: string, getServerSidePropsCookie?: string) {
  const headers = new Headers();
  if (getServerSidePropsCookie) {
    headers.append("Cookie", `sessionId=${getServerSidePropsCookie}`);
  }
  const response = await fetch(`${generateUrlPrefix()}/api/upvoteCount?slug=${slug}`, { headers });

  const data: ApiResponse<UpvoteCountPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.upvoteCount;
}
