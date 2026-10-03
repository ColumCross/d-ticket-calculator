import { Colors, type ThemeColors } from '@/constants/theme';
import { createContext, createElement, useContext, type ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';

const ThemeColorsContext = createContext<ThemeColors>(Colors.dark);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const prefersLight = Platform.OS === 'web'
    ? typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    : colorScheme === 'light';

  return createElement(
    ThemeColorsContext.Provider,
    { value: prefersLight ? Colors.light : Colors.dark },
    children,
  );
}

export function useThemeColors(): ThemeColors {
  return useContext(ThemeColorsContext);
}

export function useThemeScheme() {
  return useThemeColors() === Colors.light ? 'light' : 'dark';
}
