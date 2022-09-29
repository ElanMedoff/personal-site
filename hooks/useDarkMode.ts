import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

// https://usehooks.com/useDarkMode/
export default function useDarkMode() {
  const [enabled, setEnabledState] = useLocalStorage<boolean>(
    "dark-mode-enabled",
    false
  );

  useEffect(() => {
    const element = window.document.body;
    if (enabled) {
      element.setAttribute("data-theme", "dracula");
    } else {
      element.setAttribute("data-theme", "retro");
    }
  }, [enabled]);

  return [enabled, setEnabledState] as const;
}
