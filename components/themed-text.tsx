import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors } from '@/constants/theme';
import { useThemeScheme } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const themeStyles = colorStyles[useThemeScheme()];

  return (
    <Text
      style={[
        type === 'link' ? themeStyles.link : themeStyles.text,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});

const colorStyles = {
  dark: StyleSheet.create({
    text: { color: Colors.dark.text },
    link: { color: Colors.dark.link },
  }),
  light: StyleSheet.create({
    text: { color: Colors.light.text },
    link: { color: Colors.light.link },
  }),
};
