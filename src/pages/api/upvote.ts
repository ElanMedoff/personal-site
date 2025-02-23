import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "src/utils/api/types";
import { withMiddlware } from "src/utils/middleware";
import { allowMethods } from "src/middleware/allowMethods";
import { deleteExpiredSessions } from "src/middleware/deleteExpiredSessions";
import { onlyLoggedInUsers } from "src/middleware/onlyLoggedInUsers";
import { isSlugValid } from "src/utils/post";
import { maybeGetSession } from "src/utils/api/maybeGetSession";
import { getUpvotes } from "src/utils/api/getUpvotes";
import deleteUpvote from "src/utils/api/deleteUpvote";
import upsertPost from "src/utils/api/upsertPost";
import { maybeGetFirstUpvote } from "src/utils/api/maybeGetFirstUpvote";
import { generateUrlPrefix } from "src/loaders/helpers";

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
