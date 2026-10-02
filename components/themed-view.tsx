import { View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/theme';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  // Temporarily force dark mode while retaining the future system-theme switch.
  // const colorScheme = useColorScheme();
  // const isDark = colorScheme === 'dark';
  const isDark = true;
  const colors = isDark ? Colors.dark : Colors.light;
  const backgroundColor = colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
