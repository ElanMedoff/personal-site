import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function useIsDarkMode(firstRender: boolean) {
  const [isDarkMode, setIsDarkMode] = useState(firstRender);

  useEffect(() => {
    setCookie("darkMode", isDarkMode);
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
