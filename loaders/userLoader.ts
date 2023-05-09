import { UserPayload } from "pages/api/user";
import { ApiResponse } from "utils/apiHelpers/types";
import { generateUrlPrefix } from "./helpers";

export default async function userLoader() {
  const response = await fetch(`${generateUrlPrefix()}/api/user`);
  const data: ApiResponse<UserPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  if (data.payload.user) {
    return data.payload.user;
  }
  return null;
}
