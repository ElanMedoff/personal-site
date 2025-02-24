import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "src/utils/api/types";
import { withMiddlware } from "src/utils/middleware";
import { allowMethods } from "src/middleware/allowMethods";
import { deleteExpiredSessions } from "src/middleware/deleteExpiredSessions";
import { isSlugValid } from "src/utils/post";
import { getUpvotes } from "src/utils/api/getUpvotes";
import { generateUrlPrefix } from "src/loaders/helpers";

export interface UpvoteCountPayload {
  upvoteCount: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<UpvoteCountPayload>>) {
  if (!req.url) {
    return res.status(500).json({ type: "error", errorMessage: "no url" });
  }
  const url = new URL(`${generateUrlPrefix()}${req.url}`);

  if (!url.searchParams.has("slug")) {
    return res.status(500).json({ type: "error", errorMessage: "no post slug" });
  }

  const slug = url.searchParams.get("slug")!;
  if (!isSlugValid(slug)) {
    return res.status(500).json({ type: "error", errorMessage: "slug is invalid" });
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

export default withMiddlware(allowMethods(["GET"]), deleteExpiredSessions, handler);
