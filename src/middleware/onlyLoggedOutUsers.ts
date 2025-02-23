import { maybeGetSession } from "src/utils/api/maybeGetSession";
import { Middleware } from "src/utils/middleware";

export const onlyLoggedOutUsers: Middleware = async (req, res, next) => {
  const maybeSession = await maybeGetSession({ req, res });
  if (maybeSession.type === "error") {
    const { status, json } = maybeSession;
    return res.status(status).json(json);
  }
  if (!maybeSession.payload.session) {
    return next();
  }
  return res
    .status(400)
    .json({ type: "error", errorMessage: "user already logged in" });
};
