import { prisma } from "utils/prisma";
import { ApiHelperResponse } from "utils/api/types";

export default async function deleteSessionsByUsername({
  username,
}: {
  username: string;
}): Promise<ApiHelperResponse<null>> {
  try {
    await prisma.session.deleteMany({ where: { user: { username } } });
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
        errorMessage: `issue deleting previous session for user: ${error}`,
      },
    };
  }
}
