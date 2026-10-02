import { SafeAreaView } from 'react-native';
import HomeScreen from './index';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
