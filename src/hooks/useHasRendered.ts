import { useEffect, useState } from "react";

export function useHasRendered() {
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
  }, []);

  return hasRendered;
}
