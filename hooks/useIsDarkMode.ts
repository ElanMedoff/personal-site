import { useEffect, useState } from "react";

const key = "dark-mode-isDarkMode";
export default function useIsDarkMode() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // to make compat with ssg, only check local storage and match media after mount
  useEffect(() => {
    if (isFirstRender) {
      const item = window.localStorage.getItem(key);

      if (item) {
        setIsDarkMode(JSON.parse(item));
      } else {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        if (media.matches) {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      }
    } else {
      window.localStorage.setItem(key, JSON.stringify(isDarkMode));
    }

    setIsFirstRender(false);
  }, [isFirstRender, isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
