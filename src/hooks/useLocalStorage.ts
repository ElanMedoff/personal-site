import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const isFirstRender = useRef(true);

  // https://elanmed.dev/blog/dark-mode-client-side-approach#nuances-of-the-approach-above
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const item = window.localStorage.getItem(key);

      if (item !== null) {
        setValue(JSON.parse(item));
      }
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isFirstRender, value, key]);

  return [value, setValue] as const;
}
