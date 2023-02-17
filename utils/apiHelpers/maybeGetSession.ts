import { Session, User } from "@prisma/client";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiHelperResponse } from "utils/apiHelpers/types";
import { isProd } from "utils/envHelpers";
import { prisma } from "utils/prismaHelpers";

export async function maybeGetSession({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<ApiHelperResponse<{ session: (Session & { user: User }) | null }>> {
  if (!req.url) {
    return {
      type: "error",
      status: 500,
      json: { type: "error", errorMessage: "no url" },
    };
  }
  const url = new URL(
    `${isProd() ? "https://elanmed.dev" : "http://localhost:3000"}${req.url}`
  );

  let sessionId: string;
  const cookieSessionId = getCookie("sessionId", { req, res }) as
    | string
    | undefined;

  if (url.searchParams.has("getServerSidePropsCookie")) {
    sessionId = url.searchParams.get("getServerSidePropsCookie")!;
  } else {
    if (!cookieSessionId) {
      return {
        type: "success",
        payload: { session: null },
      };
    }
    sessionId = cookieSessionId;
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
