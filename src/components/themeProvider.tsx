"use client"

/**
 * ThemeProvider Component
 * Configures dark/light theme switching with next-themes and wraps QueryClientProvider for React Query.
 */
import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

// Re-export with proper configuration for Tailwind dark mode (attribute="class" required)
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
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