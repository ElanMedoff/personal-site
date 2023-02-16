import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/apiHelpers/types";
import { withMiddlware } from "utils/middlewareHelpers";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { requireFeatures } from "middleware/requireFeatures";
import { isSlugValid } from "utils/postHelpers";
import { maybeGetSession } from "utils/apiHelpers/maybeGetSession";
import { maybeGetFirstUpvote } from "utils/apiHelpers/maybeGetFirstUpvote";
import { generateUrlPrefix } from "loaders/helpers";

export interface HasUpvotedPayload {
  hasUpvoted: boolean;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<HasUpvotedPayload>>
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

  const maybeSession = await maybeGetSession({ req, res });
  if (maybeSession.type === "error") {
    const { status, json } = maybeSession;
    return res.status(status).json(json);
  }
  if (!maybeSession.payload.session) {
    return res
      .status(200)
      .json({ type: "success", payload: { hasUpvoted: false } });
  }

  const maybeFirstUpvote = await maybeGetFirstUpvote({
    slug,
    session: maybeSession.payload.session,
  });
  if (maybeFirstUpvote.type === "error") {
    const { status, json } = maybeFirstUpvote;
    return res.status(status).json(json);
  }

  if (maybeFirstUpvote.payload.upvote) {
    return res
      .status(200)
      .json({ type: "success", payload: { hasUpvoted: true } });
  }

  return res
    .status(200)
    .json({ type: "success", payload: { hasUpvoted: false } });
}

export default withMiddlware(
  requireFeatures(["oauth"]),
  allowMethods(["GET"]),
  deleteExpiredSessions,
  handler
);
