import { HasUpvotedPayload } from "pages/api/hasUpvoted";
import { ApiResponse } from "utils/apiHelpers/types";
import { generateUrlPrefix } from "./helpers";

export async function hasUpvotedLoader(
  slug: string,
  getServerSidePropsCookie?: string
) {
  const headers = new Headers();
  if (getServerSidePropsCookie) {
    headers.append("Cookie", `sessionId=${getServerSidePropsCookie}`);
  }
  const response = await fetch(
    `${generateUrlPrefix()}/api/hasUpvoted?slug=${slug}`,
    {
      headers,
    }
  );

  const data: ApiResponse<HasUpvotedPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.hasUpvoted;
}
