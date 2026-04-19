import { View, type ViewProps, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const backgroundColor = colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
