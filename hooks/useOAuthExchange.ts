import { isFeatureEnabled } from "utils/featureHelpers";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import exchangeLoader from "loaders/exchangeLoader";

export default function useOAuthExchange() {
  const router = useRouter();
  const queryClient = useQueryClient();

  let enabled: boolean;
  if (typeof window === "undefined") {
    enabled = false;
  } else {
    const url = new URL(window.location.toString());
    const params = new URLSearchParams(url.search);
    enabled =
      params.has("code") && params.has("state") && isFeatureEnabled("oauth");
  }

  useQuery("exchange", exchangeLoader, {
    enabled,
    onSuccess: () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      url.searchParams.delete("state");
      router.push(url, undefined, { shallow: true });

      queryClient.invalidateQueries("user");

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    },
  });
}
