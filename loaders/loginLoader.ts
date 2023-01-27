import { LoginPayload } from "pages/api/login";
import { ApiResponse } from "utils/apiHelpers";

export default async function loginLoader() {
  const response = await fetch("/api/login");
  const data: ApiResponse<LoginPayload> = await response.json();

  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.authorizeUrl;
}
