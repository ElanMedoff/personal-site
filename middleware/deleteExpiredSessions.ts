import { Middleware } from "utils/middlewareHelpers";
import { prisma } from "utils/prismaHelpers";

export const deleteExpiredSessions: Middleware = async (_, res, next) => {
  try {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      errorMessage: `issue deleting expired sessions: ${error}`,
    });
  }

  next();
};
