import { SafeAreaView } from 'react-native';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { Colors } from '@/constants/theme';
import { AppThemeProvider, useThemeColors, useThemeScheme } from '@/hooks/use-theme-color';
import HomeScreen from './index';

const themes = {
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: Colors.dark.primary,
        contrastText: Colors.dark.primaryText,
      },
      background: {
        default: Colors.dark.background,
        paper: Colors.dark.cardBackground,
      },
      text: {
        primary: Colors.dark.text,
      },
      divider: Colors.dark.border,
    },
  }),
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: Colors.light.primary,
        contrastText: Colors.light.primaryText,
      },
      background: {
        default: Colors.light.background,
        paper: Colors.light.cardBackground,
      },
      text: {
        primary: Colors.light.text,
      },
      divider: Colors.light.border,
    },
  }),
};

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <ThemedRootLayout />
    </AppThemeProvider>
  );
}

function ThemedRootLayout() {
  const colors = useThemeColors();
  const themeScheme = useThemeScheme();

  return (
    <ThemeProvider theme={themes[themeScheme]}>
      <CssBaseline />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <HomeScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}
