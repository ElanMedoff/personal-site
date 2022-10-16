import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [value, setValue] = useState<T>(initialValue);

  // to make compat with ssg, only check local storage after mount
  useEffect(() => {
    if (isFirstRender) {
      const item = window.localStorage.getItem(key);
      setValue(item ? JSON.parse(item) : initialValue);
      setIsFirstRender(false);
      return;
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [initialValue, isFirstRender, key, value]);

  return [value, setValue] as const;
}
