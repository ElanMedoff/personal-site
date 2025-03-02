import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "src/middleware/allowMethods";
import { deleteExpiredSessions } from "src/middleware/deleteExpiredSessions";
import { maybeGetSession } from "src/utils/api/maybeGetSession";
import { ApiResponse } from "src/utils/api/types";
import { withMiddlware } from "src/utils/middleware";

export interface UserPayload {
  user: {
    username: string;
  } | null;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<UserPayload>>) {
  const maybeSession = await maybeGetSession({ req, res });
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
export default withMiddlware(allowMethods(["GET"]), deleteExpiredSessions, handler);
