import Cookies from "cookies";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { requireFeatures } from "middleware/requireFeatures";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/apiHelpers";
import { withMiddlware } from "utils/middlewareHelpers";
import { prisma } from "utils/prismaHelpers";
export type UserPayload = {
  user: {
    username: string;
  } | null;
};
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UserPayload>>
) {
  const cookies = new Cookies(req, res);
  const cookieSessionId = cookies.get("sessionId");
  if (!cookieSessionId) {
    return res.status(200).json({ type: "success", payload: { user: null } });
  }
  const dbSession = await prisma.session.findUnique({
    where: {
      id: cookieSessionId,
    },
    include: {
      user: true,
    },
  });
  if (!dbSession) {
    return res.status(200).json({ type: "success", payload: { user: null } });
  }
  return res.status(200).json({
    type: "success",
    payload: { user: { username: dbSession.user.username } },
  });
}
export default withMiddlware(
  requireFeatures(["oauth"]),
  allowMethods(["GET"]),
  deleteExpiredSessions,
  handler
);
