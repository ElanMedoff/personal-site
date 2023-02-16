import { Upvote } from "@prisma/client";
import { prisma } from "utils/prismaHelpers";
import { ApiHelperResponse } from "utils/apiHelpers/types";

export default async function deleteUpvote({
  upvote,
}: {
  upvote: Upvote;
}): Promise<ApiHelperResponse<null>> {
  try {
    await prisma.upvote.delete({
      where: {
        id: upvote.id,
      },
    });

    return {
      type: "success",
      payload: null,
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
