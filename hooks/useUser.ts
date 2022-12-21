import { UserPayload } from "pages/api/user";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "utils/apiHelpers";

export default function useUser() {
  const [user, setUser] = useState<UserPayload["user"]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchUser = useCallback(async () => {
    setUser(undefined);
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/user");
      const data: ApiResponse<UserPayload> = await response.json();
      if (data.type === "error") {
        throw new Error(data.errorMessage);
      }

      if (data.payload.user) {
        setUser(data.payload.user);
      }
    } catch (e) {
      setError("Issue fetching user");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, fetchUser };
}
