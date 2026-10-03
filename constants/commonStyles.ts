import { Colors, type ThemeColors } from '@/constants/theme';
import { useThemeScheme } from '@/hooks/use-theme-color';
import { StyleSheet } from 'react-native';

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  cardContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    gap: 8,
    backgroundColor: colors.cardBackground,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  savedTripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
    borderRadius: 12,
    gap: 8,
    padding: 8,
    backgroundColor: colors.background,
  },
});

const themedStyles = {
  dark: createStyles(Colors.dark),
  light: createStyles(Colors.light),
};

export const useThemedStyles = () => themedStyles[useThemeScheme()];
