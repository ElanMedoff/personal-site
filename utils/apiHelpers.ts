import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { prisma } from "utils/prismaHelpers";

type SuccessResponse<T> = {
  type: "success";
  payload: T;
};

interface ErrorResponse {
  type: "error";
  errorMessage: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const isUserLoggedIn = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) => {
  const cookies = new Cookies(req, res);
  const cookieSessionId = cookies.get("sessionId");
  if (!cookieSessionId) {
    return false;
  }

  const dbSession = await prisma.session.findUnique({
    where: {
      id: cookieSessionId,
    },
  });

  return !!dbSession;
};

export const deleteExpiredSessions = async () => {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
};
