import { prisma } from "src/utils/prisma";
import { ApiHelperResponse } from "src/utils/api/types";
import { Upvote, Session } from "@prisma/client";

export async function maybeGetFirstUpvote({
  session,
  slug,
}: {
  session: Session;
  slug: string;
}): Promise<ApiHelperResponse<{ upvote: Upvote | null }>> {
  try {
    const upvote = await prisma.upvote.findFirst({
      where: {
        slug,
        userId: session.userId,
      },
    });
    if (upvote) {
      return {
        type: "success",
        payload: {
          upvote,
        },
      };
    }

    return {
      type: "success",
      payload: {
        upvote: null,
      },
    };
  } catch (error) {
    return {
      type: "error",
      status: 500,
      json: {
        type: "error",
        errorMessage: `issue fetching post: ${error}`,
      },
    };
  }
}
