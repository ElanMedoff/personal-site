import { Middleware } from "src/utils/middleware";
import { prisma } from "src/utils/prisma";

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
    return res.status(500).json({
      type: "error",
      errorMessage: `issue deleting expired sessions: ${error}`,
    });
  }

  return next();
};
