import { generateUrlPrefix } from "src/loaders/helpers";
import { LoginPayload } from "src/pages/api/login";
import { ApiResponse } from "src/utils/api/types";

export async function loginLoader() {
  const response = await fetch(`${generateUrlPrefix()}/api/login`);
  const data: ApiResponse<LoginPayload> = await response.json();

  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return data.payload.authorizeUrl;
}
