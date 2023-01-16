import { Session } from "@prisma/client";
import { getCookie } from "cookies-next";
import { Middleware } from "utils/middlewareHelpers";
import { prisma } from "utils/prismaHelpers";

export const onlyLoggedOutUsers: Middleware = async (req, res, next) => {
  const cookieSessionId = getCookie("sessionId", { req, res }) as
    | string
    | undefined;
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
      .json({ type: "error", errorMessage: `issue finding session: ${error}` });
  }

  if (dbSession) {
    return res
      .status(400)
      .json({ type: "error", errorMessage: "user already logged in" });
  }

  return next();
};
