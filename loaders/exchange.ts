import { ApiResponse } from "utils/api/types";
import { generateUrlPrefix } from "./helpers";

export async function exchangeLoader() {
  const response = await fetch(`${generateUrlPrefix()}/api/exchange`);
  const data: ApiResponse<null> = await response.json();

  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  return null;
}
