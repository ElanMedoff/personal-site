import { ApiResponse } from "utils/apiHelpers";

export default async function exchangeLoader() {
  const response = await fetch("/api/exchange");
  const data: ApiResponse<null> = await response.json();

  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }
}
