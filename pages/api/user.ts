import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { NextApiRequest, NextApiResponse } from "next";
import { maybeGetSession } from "utils/api/maybeGetSession";
import { ApiResponse } from "utils/api/types";
import { withMiddlware } from "utils/middleware";

export type UserPayload = {
  user: {
    username: string;
  } | null;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UserPayload>>
) {
  const maybeSession = await maybeGetSession({ req, res, src: "user" });
  if (maybeSession.type === "error") {
    const { status, json } = maybeSession;
    return res.status(status).json(json);
  }
  if (!maybeSession.payload.session) {
    return res.status(200).json({ type: "success", payload: { user: null } });
  }

  const { username } = maybeSession.payload.session.user;
  return res.status(200).json({
    type: "success",
    payload: { user: { username } },
  });
}
export default withMiddlware(
  allowMethods(["GET"]),
  deleteExpiredSessions,
  handler
);
