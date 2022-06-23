import { useState } from "react";

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  localStorage.theme = "dark";
  document.documentElement.classList.add("dark");
} else {
  localStorage.theme = "light";
  document.documentElement.classList.remove("dark");
}

export function useTheme() {
  const [theme, setTheme] = useState(localStorage.theme || "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.theme = theme === "light" ? "dark" : "light";

    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return {
    theme,
    toggleTheme,
  };
}
