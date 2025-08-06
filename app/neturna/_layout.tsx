import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: 'Neturna',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#0e1e91ff',
          },
          headerTintColor: '#faf3d5',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      />
  );
}
