import { Colors } from '@/constants/theme';
import { StyleSheet, useColorScheme } from 'react-native';

export const useThemedStyles = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return StyleSheet.create({
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
    }
  });
};

export const textFieldStyles = {
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInputBase-formLabel': {
    color: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
};

export const checkboxStyles = {
  color: 'white',
  '&.Mui-checked': {
    color: 'white',
  },
  '& .MuiCheckbox-root': {
    padding: 0,
  },
};

export const linkButtonStyles = { 
  color: '#99CCFF', 
  textTransform: 'none', 
  padding: 0, 
  justifyContent: 'flex-start',
  textDecoration: 'underline'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.dark.background,
  },
  cardContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    gap: 8,
    backgroundColor: Colors.dark.cardBackground,
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
  }

});
