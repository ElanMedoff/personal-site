import { Session } from "@prisma/client";
import { prisma } from "src/utils/prisma";
import { ApiHelperResponse } from "src/utils/api/types";

export async function createSession({
  accessToken,
  expiresAt,
  username,
}: {
  accessToken: string;
  expiresAt: Date;
  username: string;
}): Promise<ApiHelperResponse<{ session: Session }>> {
  try {
    const session = await prisma.session.create({
      data: {
        accessToken,
        expiresAt,
        user: {
          connectOrCreate: {
            where: {
              username,
            },
            create: {
              username,
            },
          },
        },
      },
    });

    return {
      type: "success",
      payload: {
        session,
      },
    };
  } catch (error) {
    return {
      type: "error",
      status: 500,
      json: {
        type: "error",
        errorMessage: `issue creating a new session: ${error}`,
      },
    };
  }
}
