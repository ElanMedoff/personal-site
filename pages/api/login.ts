import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { getClientId, isProd } from "utils/env";
import { ApiResponse } from "utils/api/types";
import { withMiddlware } from "utils/middleware";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { onlyLoggedOutUsers } from "middleware/onlyLoggedOutUsers";
import { setCookie } from "cookies-next";

export interface LoginPayload {
  authorizeUrl: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<LoginPayload>>
) {
  if (!req.headers.referer) {
    return res.status(401).json({ type: "error", errorMessage: "no referer" });
  }
  const clientId = getClientId();
  const state = randomUUID();

  setCookie("state", state, {
    req,
    res,
    secure: isProd(),
    maxAge: 1000 * 60 * 10,
  });

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("redirect_uri", req.headers.referer);
  params.append("scope", "read:user");
  params.append("state", state);
  const authorizeUrl = new URL(
    `https://github.com/login/oauth/authorize?${params}`
  ).toString();
  res.status(200).json({ type: "success", payload: { authorizeUrl } });
}

export default withMiddlware(
  allowMethods(["GET"]),
  onlyLoggedOutUsers,
  deleteExpiredSessions,
  handler
);
