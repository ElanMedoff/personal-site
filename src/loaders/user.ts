import { UserPayload } from "src/pages/api/user";
import { ApiResponse } from "src/utils/api/types";
import { generateUrlPrefix } from "./helpers";

export async function userLoader(getServerSidePropsCookie?: string) {
  const headers = new Headers();
  if (getServerSidePropsCookie) {
    headers.append("Cookie", `sessionId=${getServerSidePropsCookie}`);
  }
  const response = await fetch(`${generateUrlPrefix()}/api/user`, {
    headers,
  });
  const data: ApiResponse<UserPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  if (data.payload.user) {
    return data.payload.user;
  }
  return null;
}
