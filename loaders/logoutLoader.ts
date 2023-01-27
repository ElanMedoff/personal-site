import { ApiResponse } from "utils/apiHelpers";

export default async function logoutLoader() {
  const response = await fetch("/api/logout");
  const data: ApiResponse<null> = await response.json();

  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }
  return null;
}
