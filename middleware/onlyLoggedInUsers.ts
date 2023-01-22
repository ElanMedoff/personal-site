import { Session } from "@prisma/client";
import { getCookie } from "cookies-next";
import { Middleware } from "utils/middlewareHelpers";
import { prisma } from "utils/prismaHelpers";

export const onlyLoggedInUsers: Middleware = async (req, res, next) => {
  const cookieSessionId = getCookie("sessionId", { req, res }) as
    | string
    | undefined;
  if (!cookieSessionId) {
    return res
      .status(401)
      .json({ type: "error", errorMessage: "no session id cookie" });
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
  if (!dbSession) {
    return res.status(401).json({ type: "error", errorMessage: "no session" });
  }
  return next();
};
