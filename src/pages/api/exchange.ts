import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/core";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { getClientId, getClientSecret, isProd } from "src/utils/env";
import { ApiResponse } from "src/utils/api/types";
import { deleteExpiredSessions } from "src/middleware/deleteExpiredSessions";
import { allowMethods } from "src/middleware/allowMethods";
import { withMiddlware } from "src/utils/middleware";
import { onlyLoggedOutUsers } from "src/middleware/onlyLoggedOutUsers";
import createSession from "src/utils/api/createSession";
import deleteSessionsByUsername from "src/utils/api/deleteSessionsByUsername";

async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<null>>) {
  const cookieState = getCookie("state", { req, res, secure: isProd() }) as string | undefined;
  if (!cookieState) {
    return res.status(401).json({ type: "error", errorMessage: "no state in cookie" });
  }

  if (!req.headers.referer) {
    return res.status(401).json({ type: "error", errorMessage: "no referer" });
  }

  const refererUrl = new URL(req.headers.referer);
  const refererParams = new URLSearchParams(refererUrl.search);
  if (!refererParams.has("state")) {
    return res.status(401).json({ type: "error", errorMessage: "no state in url" });
  }

  const urlState = refererParams.get("state");
  if (cookieState !== urlState) {
    return res.status(401).json({
      type: "error",
      errorMessage: "url state doesnt match cookie state",
    });
  }

  if (!refererParams.has("code")) {
    return res.status(401).json({ type: "error", errorMessage: "no code in url" });
  }

  const clientId = getClientId();
  const clientSecret = getClientSecret();

  const authorizationParams = new URLSearchParams();
  authorizationParams.append("client_id", clientId);
  authorizationParams.append("client_secret", clientSecret);

  const codeParam = refererParams.get("code");
  if (codeParam) {
    authorizationParams.append("code", codeParam);
  }

  const authorizationUrl = new URL(
    `https://github.com/login/oauth/access_token?${authorizationParams}`,
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
    const response = await octokit.request("GET /user", {});
    username = response?.data?.login;
    if (!username) {
      throw new Error();
    }
  } catch (error) {
    return res.status(500).json({
      type: "error",
      errorMessage: `issue fetching user profile: ${error}`,
    });
  }

  const deleted = await deleteSessionsByUsername({ username });
  if (deleted.type === "error") {
    const { status, json } = deleted;
    return res.status(status).json(json);
  }

  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * (isProd() ? 60 * 12 : 10));

  const createdSession = await createSession({
    accessToken,
    expiresAt,
    username,
  });
  if (createdSession.type === "error") {
    const { status, json } = createdSession;
    return res.status(status).json(json);
  }

  setCookie("sessionId", createdSession.payload.session.id, {
    req,
    res,
    secure: isProd(),
    sameSite: "strict",
    expires: expiresAt,
  });
  deleteCookie("state", { req, res });

  return res.status(200).json({ type: "success", payload: null });
}

export default withMiddlware(
  allowMethods(["GET"]),
  onlyLoggedOutUsers,
  deleteExpiredSessions,
  handler,
);
