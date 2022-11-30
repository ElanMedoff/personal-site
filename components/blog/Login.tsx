import { useRouter } from "next/router";
import { LoginPayload } from "pages/api/login";
import { UserPayload } from "pages/api/user";
import React from "react";
import styles from "styles/icons.module.scss";
import { twMerge as tm } from "tailwind-merge";
import { ApiResponse } from "utils/apiHelpers";
import { transitionProperties } from "utils/styleHelpers";

export default function Login({ user }: { user: UserPayload["user"] }) {
  const router = useRouter();

  const onClick = async () => {
    try {
      const response = await fetch("/api/login");
      const data: ApiResponse<LoginPayload> = await response.json();

      if (data.type === "error") {
        throw new Error(data.errorMessage);
      }

      router.push(data.payload.authorizeUrl);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        className={tm(
          "border-2 border-neutral px-6 py-3 rounded-lg flex items-center shadow-xl",
          !user && "hover:scale-95 active:scale-90"
        )}
        onClick={user ? undefined : onClick}
        style={{
          ...transitionProperties,
          transitionProperty: "transform",
        }}
      >
        <span className={tm(styles.github, "mr-6")} />
        <span>{user ? `welcome, ${user.username}!` : "login with github"}</span>
      </button>
      {user ? (
        <p className="text-xs italic w-full flex justify-center mt-4">
          (more features to come)
        </p>
      ) : null}
    </div>
  );
}
