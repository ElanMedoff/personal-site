import { Session } from "@prisma/client";
import { prisma } from "utils/prisma";
import { ApiHelperResponse } from "utils/api/types";

export default async function deleteSessionById({
  session,
}: {
  session: Session;
}): Promise<ApiHelperResponse<null>> {
  try {
    await prisma.session.delete({
      where: { id: session.id },
    });
  } catch (error) {
    return {
      type: "error",
      status: 500,
      json: {
        type: "error",
        errorMessage: `issue deleting session: ${error}`,
      },
    };
  }
  return {
    type: "success",
    payload: null,
  };
}
