import { prisma } from "utils/prismaHelpers";
import { ApiHelperResponse } from "utils/apiHelpers/types";

export async function getUpvotes({
  slug,
}: {
  slug: string;
}): Promise<ApiHelperResponse<{ upvotes: number }>> {
  try {
    const upvotes = await prisma.upvote.findMany({
      where: {
        slug,
      },
    });

    return {
      type: "success",
      payload: { upvotes: upvotes.length },
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
