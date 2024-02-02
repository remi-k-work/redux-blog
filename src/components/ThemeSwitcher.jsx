// component css styles
import styles from "./ThemeSwitcher.module.css";

// react
import { useEffect, useState } from "react";

// other libraries
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(prefersDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  return (
    <section className={styles["theme-switcher"]}>
      <button
        type="button"
        aria-label={`Change theme to ${theme === "light" ? "dark" : "light"} mode`}
        role="switch"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" ? <SunIcon width={24} height={24} /> : <MoonIcon width={24} height={24} />}
      </button>
    </section>
  );
}
