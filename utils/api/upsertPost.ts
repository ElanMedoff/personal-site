import { prisma } from "utils/prisma";
import { ApiHelperResponse } from "utils/api/types";

export default async function upsertPost({
  slug,
  userId,
}: {
  slug: string;
  userId: number;
}): Promise<ApiHelperResponse<null>> {
  try {
    await prisma.post.upsert({
      create: {
        slug,
        upvote: {
          create: {
            userId,
          },
        },
      },
      update: {
        upvote: {
          create: {
            userId,
          },
        },
      },
      where: {
        slug,
      },
    });
  } catch (error) {
    return {
      type: "error",
      status: 500,
      json: {
        type: "error",
        errorMessage: `issue upserting post with upvote: ${error}`,
      },
    };
  }

  return {
    type: "success",
    payload: null,
  };
}
