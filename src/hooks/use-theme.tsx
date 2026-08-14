import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

/** Inline script string: applies the stored/system theme before paint (no flash). */
/** Dark is the default; a stored user choice always wins. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var t=(s==="light"||s==="dark")?s:"dark";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add("dark");}})();`;

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setThemeState(current);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
