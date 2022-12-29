import { NextApiRequest, NextApiResponse } from "next";
import { getClientId, getClientSecret, isProd } from "utils/envHelpers";
import Cookies from "cookies";
import { prisma } from "utils/prismaHelpers";
import { Octokit } from "@octokit/core";
import { ApiResponse } from "utils/apiHelpers";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { allowMethods } from "middleware/allowMethods";
import { withMiddlware } from "utils/middlewareHelpers";
import { Session } from "@prisma/client";
import { requireFeatures } from "middleware/requireFeatures";
import { onlyLoggedOutUsers } from "middleware/onlyLoggedOutUsers";

export interface ExchangePayload {
  username: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ExchangePayload>>
) {
  const cookies = new Cookies(req, res);
  const cookieState = cookies.get("state");
  if (!cookieState) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no state in cookie" });
  }

  const postBody = JSON.parse(req.body);
  if (typeof postBody !== "object" || postBody === null) {
    return res.status(401).json({
      type: "error",
      errorMessage: "post body is null or is not an object",
    });
  }

  if (!postBody.state) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no state in post body" });
  }

  if (cookieState !== postBody.state) {
    return res.status(401).json({
      type: "error",
      errorMessage: "url state doesn't match cookie state",
    });
  }

  if (!postBody.code) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no code in post body" });
  }

  const clientId = getClientId();
  const clientSecret = getClientSecret();

  const authorizationParams = new URLSearchParams();
  authorizationParams.append("client_id", clientId);
  authorizationParams.append("client_secret", clientSecret);
  authorizationParams.append("code", postBody.code);
  const authorizationUrl = new URL(
    `https://github.com/login/oauth/access_token?${authorizationParams}`
  );

  const headers = new Headers();
  headers.append("Accept", "application/json");

  let accessToken = "";
  try {
    const response = await fetch(authorizationUrl, { headers, method: "POST" });
    const data: { access_token?: string } | undefined = await response.json();

    if (!data?.access_token) {
      return res.status(500).json({
        type: "error",
        errorMessage: "no access token returned by github api",
      });
    }
    accessToken = data.access_token;
  } catch (error) {
    return res.status(500).json({
      type: "error",
      errorMessage: `issue fetching to exchange code: ${error}`,
    });
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
  } catch (error) {
    return res.status(500).json({
      type: "error",
      errorMessage: `issue fetching user profile: ${error}`,
    });
  }

  try {
    await prisma.session.deleteMany({ where: { user: { username } } });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      errorMessage: `issue deleting previous session for user: ${error}`,
    });
  }

  const expiresAt = new Date(
    new Date().getTime() + 1000 * 60 * (isProd() ? 30 : 1)
  );

  let sessionId: Session;
  try {
    sessionId = await prisma.session.create({
      data: {
        accessToken,
        expiresAt,
        user: {
          connectOrCreate: {
            where: {
              username,
            },
            create: {
              username,
            },
          },
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      errorMessage: `issue creating a new session: ${error}`,
    });
  }

  cookies.set("sessionId", sessionId.id, {
    sameSite: "strict",
    /* secure: isProd(), */
    expires: expiresAt,
  });
  cookies.set("state");

  return res.status(200).json({ type: "success", payload: { username } });
}

export default withMiddlware(
  requireFeatures(["oauth"]),
  allowMethods(["POST"]),
  onlyLoggedOutUsers,
  deleteExpiredSessions,
  handler
);
