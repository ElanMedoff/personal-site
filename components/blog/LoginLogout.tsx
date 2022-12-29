import { useRouter } from "next/router";
import { LoginPayload } from "pages/api/login";
import { UserPayload } from "pages/api/user";
import React from "react";
import styles from "styles/icons.module.scss";
import { twMerge as tm } from "tailwind-merge";
import { ApiResponse } from "utils/apiHelpers";
import { transitionProperties } from "utils/styleHelpers";

export default function LoginLogout({
  user,
  fetchUser,
}: {
  user: UserPayload["user"];
  fetchUser: () => Promise<void>;
}) {
  const router = useRouter();

  const handleLoginClick = async () => {
    try {
      const response = await fetch("/api/login");
      const data: ApiResponse<LoginPayload> = await response.json();

      if (data.type === "error") {
        throw new Error(data.errorMessage);
      }

      router.push(data.payload.authorizeUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      const response = await fetch("/api/logout");
      const data: ApiResponse<null> = await response.json();

      if (data.type === "error") {
        throw new Error(data.errorMessage);
      }

      fetchUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      {user ? <p>welcome, {user.username}!</p> : null}
      <button
        className={tm(
          "border-2 border-neutral px-6 py-3 rounded-lg flex items-center shadow-xl",
          "hover:scale-95 active:scale-90"
        )}
        onClick={user ? handleLogoutClick : handleLoginClick}
        style={{
          ...transitionProperties,
          transitionProperty: "transform",
        }}
      >
        <span className={tm(styles.github, "mr-8")} />
        <span>{user ? "logout" : "login with github"}</span>
      </button>
      {user ? (
        <p className="text-xs italic w-full flex justify-center">
          (more features coming soong)
        </p>
      ) : null}
    </div>
  );
}
