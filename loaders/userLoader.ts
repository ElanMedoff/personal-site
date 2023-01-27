import { UserPayload } from "pages/api/user";
import { ApiResponse } from "utils/apiHelpers";

export default async function userLoader() {
  const response = await fetch("/api/user");
  const data: ApiResponse<UserPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  if (data.payload.user) {
    return data.payload.user;
  }
  return null;
}
