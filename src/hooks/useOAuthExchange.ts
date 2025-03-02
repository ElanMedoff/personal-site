import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeLoader } from "src/loaders/exchange";
import { generateQueryKey } from "src/loaders/helpers";
import { useEffect } from "react";

export function useOAuthExchange() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const queryClient = useQueryClient();

  const { mutate, ...restMutation } = useMutation({
    mutationFn: () => exchangeLoader(),
    onSuccess: () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      url.searchParams.delete("state");
      router.push(url, undefined, { shallow: true });
      queryClient.invalidateQueries({ queryKey: generateQueryKey("user", []) });
      queryClient.invalidateQueries({ queryKey: generateQueryKey("hasUpvoted", [slug]) });
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.toString());
    const params = new URLSearchParams(url.search);
    if (params.has("code") && params.has("state")) {
      mutate();
    }
  }, [mutate]);

  return restMutation;
}
