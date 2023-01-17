import { setCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";

export default function useIsDarkMode(serverSideCookie: boolean | null) {
  const [isDarkMode, setIsDarkMode] = useState(serverSideCookie ?? false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    if (serverSideCookie === null) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      if (media.matches) {
        setCookie("isDarkMode", true, {
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 365,
        });
      } else {
        setCookie("isDarkMode", false, {
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 365,
        });
      }
    }
  }, [isDarkMode, serverSideCookie]);

  const setStateAndCookie = (value: boolean | ((val: boolean) => boolean)) => {
    const valueToSet = value instanceof Function ? value(isDarkMode) : value;
    setIsDarkMode(valueToSet);
    setCookie("isDarkMode", valueToSet, { httpOnly: false });
  };

  return [isDarkMode, setStateAndCookie] as const;
}
