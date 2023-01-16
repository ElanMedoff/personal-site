import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function useIsDarkMode(firstRender: boolean) {
  const [isDarkMode, setIsDarkMode] = useState(firstRender);

  useEffect(() => {
    try {
      setCookie("darkMode", isDarkMode, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        httpOnly: false,
        secure: false,
        sameSite: "none",
      });
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
