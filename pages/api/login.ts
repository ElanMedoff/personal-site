import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import Cookies from "cookies";
import { getClientId, isProd } from "utils/envHelpers";
import { ApiResponse } from "utils/apiHelpers";
import { withMiddlware } from "utils/middlewareHelpers";
import { allowMethods } from "middleware/allowMethods";
import { deleteExpiredSessions } from "middleware/deleteExpiredSessions";
import { requireFeatures } from "middleware/requireFeatures";
import { onlyLoggedOutUsers } from "middleware/onlyLoggedOutUsers";

export interface LoginPayload {
  authorizeUrl: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<LoginPayload>>
) {
  if (!req.headers.referer) {
    return res.status(401).json({ type: "error", errorMessage: "no referer" });
  }

  const clientId = getClientId();

  const state = randomUUID();

  const cookies = new Cookies(req, res);
  cookies.set("state", state, {});
  return res
    .status(400)
    .json({ type: "error", errorMessage: `after cookies, ${isProd()}` });

  /* const params = new URLSearchParams(); */
  /* params.append("client_id", clientId); */
  /* params.append("redirect_uri", req.headers.referer); */
  /* params.append("scope", "read:user"); */
  /* params.append("state", state); */
  /**/
  /* const authorizeUrl = new URL( */
  /*   `https://github.com/login/oauth/authorize?${params}` */
  /* ).toString(); */
  /**/
  /* res.status(200).json({ type: "success", payload: { authorizeUrl } }); */
}

/* export default withMiddlware( */
/*   requireFeatures(["oauth"]), */
/*   allowMethods(["POST"]), */
/*   onlyLoggedOutUsers, */
/*   deleteExpiredSessions, */
/*   handler */
/* ); */
