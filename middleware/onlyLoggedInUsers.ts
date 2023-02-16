import { maybeGetSession } from "utils/apiHelpers/maybeGetSession";
import { Middleware } from "utils/middlewareHelpers";

export const onlyLoggedInUsers: Middleware = async (req, res, next) => {
  const maybeSession = await maybeGetSession({ req, res });
  if (maybeSession.type === "error") {
    const { status, json } = maybeSession;
    return res.status(status).json(json);
  }
  if (!maybeSession.payload.session) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no session or no cookie" });
  }
  return next();
};
