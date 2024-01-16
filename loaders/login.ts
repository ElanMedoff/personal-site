import { LoginPayload } from "pages/api/login";
import { ApiResponse } from "utils/api/types";
import { generateUrlPrefix } from "./helpers";

export async function loginLoader() {
  const response = await fetch(`${generateUrlPrefix()}/api/login`);
  const data: ApiResponse<LoginPayload> = await response.json();

  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.authorizeUrl;
}
