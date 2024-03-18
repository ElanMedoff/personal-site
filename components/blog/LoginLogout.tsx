import React, { useMemo } from "react";
import styles from "styles/icons.module.scss";
import Spinner from "react-spinners/ClipLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "utils/style";
import { userLoader } from "loaders/user";
import { logoutLoader } from "loaders/logout";
import { loginLoader } from "loaders/login";
import { useOAuthExchange } from "hooks/useOAuthExchange";
import { generateQueryKey, generateUrlPrefix } from "loaders/helpers";

export function LoginLogout() {
  const { isFetching } = useOAuthExchange();
  const router = useRouter();
  const slug = router.query.slug as string;

  const isLoading = useMemo(() => {
    const url = new URL(`${generateUrlPrefix()}${router.asPath}`);
    const params = new URLSearchParams(url.search);
    return (params.has("code") && params.has("state")) || isFetching;
  }, [router.asPath, isFetching]);

  const queryClient = useQueryClient();
  const { data: user } = useQuery(generateQueryKey("user", []), () =>
    userLoader()
  );
  const { mutate: login } = useMutation(
    generateQueryKey("login", []),
    loginLoader,
    {
      onSuccess: (authorizeUrl) => {
        router.push(authorizeUrl);
      },
    }
  );
  const { mutate: logout } = useMutation(logoutLoader, {
    onSuccess: () => {
      queryClient.invalidateQueries(generateQueryKey("user", []));
      queryClient.invalidateQueries(generateQueryKey("hasUpvoted", [slug]));
    },
  });

  const handleLoginClick = () => {
    login();
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className="relative">
      <button
        className={tm(
          "border-2 border-neutral px-2 py-2 rounded-lg flex items-center shadow-2xl text-sm",
          "hover:scale-95 active:scale-90",
          user && "bg-warning"
        )}
        onClick={user ? handleLogoutClick : handleLoginClick}
        style={{
          ...transitionProperties,
          transitionProperty: "transform",
        }}
      >
        <span className={tm(styles.github, "mr-8")} />
        <span className={user ? "text-warning-content" : ""}>
          {user ? <p>logout</p> : <p>login with github</p>}
        </span>
      </button>
      {isLoading ? (
        <div
          className={tm(
            "absolute top-0 right-0",
            "w-full flex justify-center items-center h-full rounded-lg",
            "bg-warning bg-opacity-70"
          )}
        >
          <Spinner
            color="hsl(var(--wac))"
            loading={isLoading}
            cssOverride={{ borderWidth: 3 }}
          />
        </div>
      ) : null}
    </div>
  );
}
