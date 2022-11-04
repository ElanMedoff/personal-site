import { ReactNode } from "react";
import Header from "./Header";
import { createContext, Dispatch, SetStateAction } from "react";
import useIsDarkMode from "../hooks/useIsDarkMode";

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: null | Dispatch<SetStateAction<boolean>>;
}>({ isDarkMode: false, setIsDarkMode: null });

export default function Layout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useIsDarkMode();

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div data-theme={isDarkMode ? "dracula" : "emerald"}>
        <Header />
        <div>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}
