import { SafeAreaView } from 'react-native';
import HomeScreen from './index';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
