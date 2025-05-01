"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-8 h-8" aria-label="Toggle theme">
        <Sun className="h-[1.1rem] w-[1.1rem]" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-8 h-8"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.1rem] w-[1.1rem] transition-transform duration-200" />
      ) : (
        <Moon className="h-[1.1rem] w-[1.1rem] transition-transform duration-200" />
      )}
    </Button>
  )
}
