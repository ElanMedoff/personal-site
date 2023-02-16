import { UserPayload } from "pages/api/user";
import { ApiResponse } from "utils/apiHelpers/types";
import { generateUrlPrefix } from "./helpers";

export default async function userLoader(getServerSidePropsCookie?: string) {
  const response = await fetch(
    `${generateUrlPrefix()}/api/user?${
      getServerSidePropsCookie
        ? `getServerSidePropsCookie=${getServerSidePropsCookie}`
        : ""
    }`
  );
  const data: ApiResponse<UserPayload> = await response.json();
  if (data.type === "error") {
    throw new Error(data.errorMessage);
  }

  if (data.payload.user) {
    return data.payload.user;
  }
  return null;
}
