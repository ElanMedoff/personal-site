import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useIsDarkMode(firstRender: boolean) {
  const [isDarkMode, setIsDarkMode] = useState(firstRender);

  useEffect(() => {
    try {
      Cookies.set("darkMode", isDarkMode.toString(), { httpOnly: false });
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
