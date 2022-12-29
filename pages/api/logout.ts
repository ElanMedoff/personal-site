import Cookies from "cookies";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { requireFeatures } from "middleware/requireFeatures";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/apiHelpers";
import { withMiddlware } from "utils/middlewareHelpers";
import { prisma } from "utils/prismaHelpers";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<null>>
) {
  const cookies = new Cookies(req, res);
  const cookieSessionId = cookies.get("sessionId");
  if (!cookieSessionId) {
    return res.status(200).json({ type: "success", payload: null });
  }

  try {
    await prisma.session.delete({
      where: { id: cookieSessionId },
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      errorMessage: `issue deleting session: ${error}`,
    });
  }

  cookies.set("sessionId");
  return res.status(200).json({ type: "success", payload: null });
}

export default withMiddlware(
  requireFeatures(["oauth"]),
  allowMethods(["GET"]),
  deleteExpiredSessions,
  handler
);
