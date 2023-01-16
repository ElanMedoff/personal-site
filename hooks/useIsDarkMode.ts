import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { isProd } from "utils/envHelpers";

export default function useIsDarkMode(firstRender: boolean) {
  const [isDarkMode, setIsDarkMode] = useState(firstRender);

  useEffect(() => {
    setCookie("darkMode", isDarkMode, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      httpOnly: false,
      secure: false,
      sameSite: "none",
    });
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
