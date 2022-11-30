import { NextApiRequest, NextApiResponse } from "next";
import { getClientId, getClientSecret, isProd } from "utils/envHelpers";
import Cookies from "cookies";
import { isFeatureEnabled } from "utils/gateHelpers";
import { prisma } from "utils/prismaHelpers";
import { Octokit } from "@octokit/core";
import { ApiResponse, isUserLoggedIn } from "utils/apiHelpers";

export interface ExchangePayload {
  username: string;
}

// TODO: clear out old sessions

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ExchangePayload>>
) {
  if (!isFeatureEnabled("oauth")) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "feature not enabled" });
  }

  if (await isUserLoggedIn(req, res)) {
    return res
      .status(400)
      .json({ type: "error", errorMessage: "user already logged in" });
  }

  if (!req.headers.referer) {
    return res.status(401).json({ type: "error", errorMessage: "no referer" });
  }

  const refererUrl = new URL(req.headers.referer);
  const refererParams = new URLSearchParams(refererUrl.search);
  if (!refererParams.has("state")) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no state in url" });
  }

  const cookies = new Cookies(req, res);
  const cookieState = cookies.get("state");
  if (!cookieState) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no state in cookie" });
  }

  const urlState = refererParams.get("state");
  if (cookieState !== urlState) {
    return res.status(401).json({
      type: "error",
      errorMessage: "url state doesn't match cookie state",
    });
  }

  if (!refererParams.has("code")) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no code in url" });
  }

  const clientId = getClientId();
  const clientSecret = getClientSecret();

  const authorizationParams = new URLSearchParams();
  authorizationParams.append("client_id", clientId);
  authorizationParams.append("client_secret", clientSecret);
  authorizationParams.append("code", refererParams.get("code")!);
  const authorizationUrl = new URL(
    `https://github.com/login/oauth/access_token?${authorizationParams}`
  );

  let accessToken = "";
  try {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    const response = await fetch(authorizationUrl, { headers, method: "POST" });
    const data = await response.json();

    if (!data.access_token) {
      return res.status(500).json({
        type: "error",
        errorMessage: "no access token returned by github api",
      });
    }
    accessToken = data.access_token;
  } catch {
    return res
      .status(500)
      .json({ type: "error", errorMessage: "issue fetching to exchange code" });
  }

  let username = "";
  try {
    const octokit = new Octokit({
      auth: accessToken,
    });
    const { data } = await octokit.request("GET /user", {});
    username = data.login;

    if (!username) {
      throw new Error();
    }
  } catch {
    return res
      .status(500)
      .json({ type: "error", errorMessage: "issue fetching user profile" });
  }

  const expiresAt = new Date(
    new Date().getTime() + 1000 * 60 * (isProd() ? 30 : 1)
  );
  const sessionId = await prisma.session.create({
    data: {
      accessToken,
      expiresAt,
      user: {
        create: {
          username,
        },
      },
    },
  });

  cookies.set("sessionId", sessionId.id, {
    sameSite: "strict",
    secure: isProd(),
    expires: expiresAt,
  });
  cookies.set("state");

  return res.status(200).json({ type: "success", payload: { username } });
}
