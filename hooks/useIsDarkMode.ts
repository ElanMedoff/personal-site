import { useEffect, useRef, useState } from "react";

const key = "isDarkMode";
const defaultValue = false;
export default function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(defaultValue);
  const isFirstRender = useRef(true);

  // to make compat with ssg, only check local storage and match media after mount
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const item = window.localStorage.getItem(key);

      if (item !== null) {
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
  }, [isFirstRender, isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
