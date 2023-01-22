import { getCookie, setCookie } from "cookies-next";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { requireFeatures } from "middleware/requireFeatures";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/apiHelpers";
import { isProd } from "utils/envHelpers";
import { withMiddlware } from "utils/middlewareHelpers";
import { prisma } from "utils/prismaHelpers";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<null>>
) {
  const cookieSessionId = getCookie("sessionId", { req, res }) as
    | string
    | undefined;
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

  setCookie("sessionId", { req, res, secure: isProd() });
  return res.status(200).json({ type: "success", payload: null });
}

export default withMiddlware(
  requireFeatures(["oauth"]),
  allowMethods(["GET"]),
  deleteExpiredSessions,
  handler
);
