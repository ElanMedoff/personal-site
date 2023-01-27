import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import React from "react";
import styles from "styles/icons.module.scss";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/styleHelpers";
import userLoader from "loaders/userLoader";
import logoutLoader from "loaders/logoutLoader";
import loginLoader from "loaders/loginLoader";

export default function LoginLogout() {
  const queryClient = useQueryClient();
  const { data: user, isLoading, isError } = useQuery("user", userLoader);
  const { refetch: login } = useQuery("login", loginLoader, {
    enabled: false,
    onSuccess: (authorizeUrl) => {
      router.push(authorizeUrl);
    },
  });
  const mutation = useMutation(logoutLoader, {
    onSuccess: () => queryClient.invalidateQueries("user"),
  });

  const router = useRouter();

  const handleLoginClick = () => {
    login();
  };

  const handleLogoutClick = () => {
    mutation.mutate();
  };

  if (isLoading || isError) return null;

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
          (more features coming soon)
        </p>
      ) : null}
    </div>
  );
}
