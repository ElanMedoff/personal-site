import { setCookie } from "cookies-next";
import { allowMethods } from "src/middleware/allowMethods";
import { deleteExpiredSessions } from "src/middleware/deleteExpiredSessions";
import { NextApiRequest, NextApiResponse } from "next";
import deleteSessionById from "src/utils/api/deleteSessionById";
import { maybeGetSession } from "src/utils/api/maybeGetSession";
import { ApiResponse } from "src/utils/api/types";
import { isProd } from "src/utils/env";
import { withMiddlware } from "src/utils/middleware";

async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<null>>) {
  const maybeSession = await maybeGetSession({ req, res });
  if (maybeSession.type === "error") {
    const { status, json } = maybeSession;
    return res.status(status).json(json);
  }
  if (!maybeSession.payload.session) {
    return res.status(200).json({ type: "success", payload: null });
  }

  const deleted = await deleteSessionById({
    session: maybeSession.payload.session,
  });
  if (deleted.type === "error") {
    const { status, json } = deleted;
    return res.status(status).json(json);
  }

  setCookie("sessionId", { req, res, secure: isProd() });
  return res.status(200).json({ type: "success", payload: null });
}

export default withMiddlware(allowMethods(["GET"]), deleteExpiredSessions, handler);
