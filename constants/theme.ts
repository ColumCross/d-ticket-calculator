export const Colors = {
  dark: {
    background: '#2a3a4a',
    cardBackground: '#1a2a3a',
    text: '#ffffff',
    link: '#99ccff',
    primary: '#1976d2',
    primaryText: '#ffffff',
    border: '#54708c',
    ticketChecked: '#006005',
    ticketCheckedBg: '#00BF0C',
    ticketUnchecked: '#1a2a3a',
  },
  light: {
    background: '#f4f7fa',
    cardBackground: '#ffffff',
    text: '#17212b',
    link: '#005ea8',
    primary: '#006d38',
    primaryText: '#ffffff',
    border: '#526577',
    ticketChecked: '#006005',
    ticketCheckedBg: '#00BF0C',
    ticketUnchecked: '#CCCCCC',
  },
};

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[ColorScheme];
