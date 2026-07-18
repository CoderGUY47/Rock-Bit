"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

// Re-export with proper configuration for Tailwind dark mode (attribute="class" required)
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useNextTheme()

  const toggleTheme = () => {
    const activeTheme = theme === 'system' ? resolvedTheme : theme
    setTheme(activeTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: (theme || 'system') as 'light' | 'dark' | 'system',
    resolvedTheme: (resolvedTheme || 'light') as 'light' | 'dark',
    setTheme,
    toggleTheme,
  }
}