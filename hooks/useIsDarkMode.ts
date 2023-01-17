import { setCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function useIsDarkMode(serverSideCookie: boolean | null) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    console.log({ serverSideCookie });
    if (serverSideCookie === null) {
      const clientSideCookie = getCookie("isDarkMode") as boolean | undefined;
      console.log({ clientSideCookie });
      if (clientSideCookie === undefined) {
        return false;
      }

      return clientSideCookie;
    }
    return serverSideCookie;
  });

  useEffect(() => {
    setCookie("isDarkMode", isDarkMode, { httpOnly: false });
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
}
