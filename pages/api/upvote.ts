import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/api/types";
import { withMiddlware } from "utils/middleware";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { onlyLoggedInUsers } from "middleware/onlyLoggedInUsers";
import { isSlugValid } from "utils/post";
import { maybeGetSession } from "utils/api/maybeGetSession";
import { getUpvotes } from "utils/api/getUpvotes";
import deleteUpvote from "utils/api/deleteUpvote";
import upsertPost from "utils/api/upsertPost";
import { maybeGetFirstUpvote } from "utils/api/maybeGetFirstUpvote";
import { generateUrlPrefix } from "loaders/helpers";

export interface UpvotePayload {
  upvoteCount: number;
  hasUpvoted: boolean;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UpvotePayload>>
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
      .status(500)
      .json({ type: "error", errorMessage: "no session or no cookie" });
  }
  const { userId } = maybeSession.payload.session;

  const maybeFirstUpvote = await maybeGetFirstUpvote({
    slug,
    session: maybeSession.payload.session,
  });
  if (maybeFirstUpvote.type === "error") {
    const { status, json } = maybeFirstUpvote;
    return res.status(status).json(json);
  }

  if (maybeFirstUpvote.payload.upvote) {
    const deleted = await deleteUpvote({
      upvote: maybeFirstUpvote.payload.upvote,
    });
    if (deleted.type === "error") {
      const { status, json } = deleted;
      return res.status(status).json(json);
    }

    const upvotes = await getUpvotes({ slug });
    if (upvotes.type === "error") {
      const { status, json } = upvotes;
      return res.status(status).json(json);
    }

    return res.status(200).json({
      type: "success",
      payload: { upvoteCount: upvotes.payload.upvotes, hasUpvoted: false },
    });
  }

  const upserted = await upsertPost({ slug, userId });
  if (upserted.type === "error") {
    const { status, json } = upserted;
    return res.status(status).json(json);
  }

  const upvotes = await getUpvotes({ slug });
  if (upvotes.type === "error") {
    const { status, json } = upvotes;
    return res.status(status).json(json);
  }

  return res.status(200).json({
    type: "success",
    payload: { upvoteCount: upvotes.payload.upvotes, hasUpvoted: true },
  });
}

export default withMiddlware(
  allowMethods(["POST"]),
  onlyLoggedInUsers,
  deleteExpiredSessions,
  handler
);
