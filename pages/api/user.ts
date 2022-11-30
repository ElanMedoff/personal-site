import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "utils/apiHelpers";
import { isFeatureEnabled } from "utils/gateHelpers";
import { prisma } from "utils/prismaHelpers";

export interface UserPayload {
  user?: {
    username: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UserPayload>>
) {
  if (!isFeatureEnabled("oauth")) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "feature not enabled" });
  }

  const cookies = new Cookies(req, res);
  const cookieSessionId = cookies.get("sessionId");
  if (!cookieSessionId) {
    return res.status(200).json({ type: "success", payload: {} });
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
    return res.status(200).json({ type: "success", payload: {} });
  }

  return res.status(200).json({
    type: "success",
    payload: { user: { username: dbSession.user.username } },
  });
}
