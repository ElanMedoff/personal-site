import { Session } from "@prisma/client";
import Cookies from "cookies";
import { Middleware } from "utils/middlewareHelpers";
import { prisma } from "utils/prismaHelpers";

export const onlyLoggedOutUsers: Middleware = async (req, res, next) => {
  const cookies = new Cookies(req, res);
  const cookieSessionId = cookies.get("sessionId");
  if (!cookieSessionId) {
    return next();
  }

  let dbSession: Session | null = null;
  try {
    dbSession = await prisma.session.findUnique({
      where: {
        id: cookieSessionId,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ type: "error", errorMessage: "issue finding session" });
  }

  if (dbSession) {
    return res
      .status(400)
      .json({ type: "error", errorMessage: "user already logged in" });
  }

  return next();
};
