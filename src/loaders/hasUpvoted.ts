import { generateUrlPrefix } from "./helpers";
import { HasUpvotedPayload } from "src/pages/api/hasUpvoted";
import { ApiResponse } from "src/utils/api/types";

export async function hasUpvotedLoader(slug: string, getServerSidePropsCookie?: string) {
  const headers = new Headers();
  if (getServerSidePropsCookie) {
    headers.append("Cookie", `sessionId=${getServerSidePropsCookie}`);
  }
  const response = await fetch(`${generateUrlPrefix()}/api/hasUpvoted?slug=${slug}`, {
    headers,
  });

  const data: ApiResponse<HasUpvotedPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.hasUpvoted;
}
