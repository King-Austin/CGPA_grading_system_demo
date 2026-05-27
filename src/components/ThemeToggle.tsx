import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      className="rp-theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark
        ? <Sun style={{ width: 14, height: 14 }} />
        : <Moon style={{ width: 14, height: 14 }} />
      }
    </button>
  )
}
