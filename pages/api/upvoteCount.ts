import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/apiHelpers/types";
import { withMiddlware } from "utils/middlewareHelpers";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { requireFeatures } from "middleware/requireFeatures";
import { isSlugValid } from "utils/postHelpers";
import { getUpvotes } from "utils/apiHelpers/getUpvotes";
import { generateUrlPrefix } from "loaders/helpers";

export interface UpvoteCountPayload {
  upvoteCount: number;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UpvoteCountPayload>>
) {
  if (!req.url) {
    return res.status(500).json({ type: "error", errorMessage: "no url" });
  }
  const url = new URL(`${generateUrlPrefix()}${req.url}`);

  if (!url.searchParams.has("slug")) {
    return res
      .status(500)
      .json({ type: "error", errorMessage: "no post slug" });
  }

  const slug = url.searchParams.get("slug")!;
  if (!isSlugValid(slug)) {
    return res
      .status(500)
      .json({ type: "error", errorMessage: "slug is invalid" });
  }

  const upvotes = await getUpvotes({ slug });
  if (upvotes.type === "error") {
    const { status, json } = upvotes;
    return res.status(status).json(json);
  }
  return res.status(200).json({
    type: "success",
    payload: { upvoteCount: upvotes.payload.upvotes },
  });
}

export default withMiddlware(
  requireFeatures(["oauth"]),
  allowMethods(["GET"]),
  deleteExpiredSessions,
  handler
);
