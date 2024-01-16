import { Session, User } from "@prisma/client";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiHelperResponse } from "utils/api/types";
import { prisma } from "utils/prisma";

export async function maybeGetSession({
  req,
  res,
  src,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  src?: string;
}): Promise<ApiHelperResponse<{ session: (Session & { user: User }) | null }>> {
  const sessionId = getCookie("sessionId", { req, res }) as string | undefined;

  if (!sessionId) {
    return {
      type: "success",
      payload: { session: null },
    };
  }

  try {
    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });

    return { type: "success", payload: { session } };
  } catch (error) {
    return {
      type: "error",
      status: 500,
      json: { type: "error", errorMessage: `issue finding session: ${error}` },
    };
  }
}
