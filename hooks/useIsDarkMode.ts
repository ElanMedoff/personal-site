import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function useIsDarkMode(serverSideCookie: boolean) {
  const [isDarkMode, setIsDarkMode] = useState(serverSideCookie);

  useEffect(() => {
    setCookie("isDarkMode", isDarkMode, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
    });
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
