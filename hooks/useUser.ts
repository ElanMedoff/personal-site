import { UserPayload } from "pages/api/user";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "utils/apiHelpers";
import { isFeatureEnabled } from "utils/featureHelpers";

export default function useUser() {
  const [user, setUser] = useState<UserPayload["user"]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setUser(null);
    setLoading(true);
    setError(null);

    if (!isFeatureEnabled("oauth")) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user");
      const data: ApiResponse<UserPayload> = await response.json();
      if (data.type === "error") {
        throw new Error(data.errorMessage);
      }

      if (data.payload.user) {
        setUser(data.payload.user);
      }
    } catch (error) {
      setError("Issue fetching user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, fetchUser };
}
