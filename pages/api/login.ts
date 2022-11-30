import { NextApiRequest, NextApiResponse } from "next";
import { isFeatureEnabled } from "utils/gateHelpers";
import { randomUUID } from "crypto";
import Cookies from "cookies";
import { getClientId, isProd } from "utils/envHelpers";
import { ApiResponse, isUserLoggedIn } from "utils/apiHelpers";

export interface LoginPayload {
  authorizeUrl: string;
}

// TODO: clear out old sessions

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<LoginPayload>>
) {
  if (!isFeatureEnabled("oauth")) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "feature not enabled" });
  }

  if (await isUserLoggedIn(req, res)) {
    return res.status(400).json({
      type: "error",
      errorMessage: "user already logged in",
    });
  }

  if (!req.headers.referer) {
    return res.status(401).json({ type: "error", errorMessage: "no referer" });
  }

  const clientId = getClientId();
  const state = randomUUID();

  const cookies = new Cookies(req, res);
  cookies.set("state", state, {
    maxAge: 1000 * 60 * 10,
    secure: isProd(),
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
