import { useEffect, useRef } from "react";
import { isFeatureEnabled } from "utils/gateHelpers";
import { ApiResponse } from "utils/apiHelpers";
import { ExchangePayload } from "pages/api/exchange";
import { useRouter } from "next/router";
import useUser from "hooks/useUser";

export default function useOAuthExchange() {
  const hasCalledExchange = useRef(false);
  const { user, fetchUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isFeatureEnabled("oauth") || hasCalledExchange.current) return;

    const url = new URL(window.location.toString());
    const params = new URLSearchParams(url.search);

    if (!params.has("code") || !params.has("state")) return;

    const exchange = async () => {
      try {
        const response = await fetch("/api/exchange");
        const data: ApiResponse<ExchangePayload> = await response.json();

        if (data.type === "error") {
          throw new Error(data.errorMessage);
        }

        fetchUser();

        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        router.push(url, undefined, { shallow: true });

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } catch (e) {
        console.error(e);
      }
    };

    exchange();
    hasCalledExchange.current = true;
  }, [fetchUser]);

  return { user };
}