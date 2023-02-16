import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import styles from "styles/icons.module.scss";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/styleHelpers";
import userLoader from "loaders/userLoader";
import logoutLoader from "loaders/logoutLoader";
import loginLoader from "loaders/loginLoader";

export default function LoginLogout() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(["user"], () => userLoader());
  const { refetch: login } = useQuery(["login"], loginLoader, {
    enabled: false,
    onSuccess: (authorizeUrl) => {
      router.push(authorizeUrl);
    },
  });
  const mutation = useMutation(logoutLoader, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["hasUpvoted", slug]);
    },
  });

  const handleLoginClick = () => {
    login();
  };

  const handleLogoutClick = () => {
    mutation.mutate();
  };

  if (isLoading || isError) return null;

  return (
    <div className="flex flex-col gap-4">
      <button
        className={tm(
          "border-2 border-neutral px-2 py-2 rounded-lg flex items-center shadow-xl text-sm",
          "hover:scale-95 active:scale-90",
          user && "bg-warning"
        )}
        onClick={user ? handleLogoutClick : handleLoginClick}
        style={{
          ...transitionProperties,
          transitionProperty: "transform",
        }}
      >
        <span className={tm(styles.github, "sm:mr-8")} />
        <span className={user ? "text-warning-content" : ""}>
          {user ? (
            <p className="hidden sm:inline">logout</p>
          ) : (
            <p className="hidden sm:inline">
              login
              <span className="hidden md:inline"> with github</span>
            </p>
          )}
        </span>
      </button>
    </div>
  );
}
