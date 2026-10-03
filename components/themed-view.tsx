import { View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/theme';
import { useThemeScheme } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundStyle = styles[useThemeScheme()];

  return <View style={[backgroundStyle, style]} {...otherProps} />;
}

const styles = {
  dark: { backgroundColor: Colors.dark.background },
  light: { backgroundColor: Colors.light.background },
};
