import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Theme } from '@/types'
import { STORAGE_KEYS } from '@/constants'

interface ThemeContextType {
  theme: Theme
  sidebarOpen: boolean
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme
    const savedSidebarState = localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE)
    
    if (savedTheme) {
      setThemeState(savedTheme)
    }
    
    if (savedSidebarState) {
      setSidebarOpen(JSON.parse(savedSidebarState))
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
    
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(sidebarOpen))
  }, [sidebarOpen])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }

  const value: ThemeContextType = {
    theme,
    sidebarOpen,
    setTheme,
    toggleSidebar,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
