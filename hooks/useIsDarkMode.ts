import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useIsDarkMode(firstRender: boolean) {
  const [isDarkMode, setIsDarkMode] = useState(firstRender);

  useEffect(() => {
    Cookies.set("isDarkMode", isDarkMode.toString(), { httpOnly: false });
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
