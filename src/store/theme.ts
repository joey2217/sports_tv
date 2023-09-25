import { create } from 'zustand'
import {
  type StateStorage,
  persist,
  createJSONStorage,
} from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  setTheme: (t: Theme) => void
}

const storage: StateStorage = {
  getItem: (name: string): string => {
    const localData = localStorage.getItem(name)
    if (localData) {
      return localData
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return '{"state":{"theme":"dark"}}'
    }
    return '{"state":{"theme":"light"}}'
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, value)
  },
  removeItem: localStorage.removeItem,
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: 'light',
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: 'local_theme',
      storage: createJSONStorage(() => storage),
    }
  )
)

const THEME_ATTR = 'data-theme'

export function setAppTheme(theme: Theme) {
  document.documentElement.setAttribute(THEME_ATTR, theme)
}
