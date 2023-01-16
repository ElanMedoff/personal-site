import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function useIsDarkMode(firstRender: boolean) {
  const [isDarkMode, setIsDarkMode] = useState(firstRender);

  useEffect(() => {
    setCookie("darkMode", isDarkMode, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
