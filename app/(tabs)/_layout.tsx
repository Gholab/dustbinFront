import { Tabs } from 'expo-router';
import React from 'react';
import { Alert, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AlertProvider } from '@/components/AlertContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AlertProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {
              backgroundColor: "#41744e",
            },
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={"#faf3d5"} />,
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: 'Stats',
            tabBarIcon: () => <IconSymbol size={28} name="query-stats" color={"#faf3d5"} />,
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: 'Alerts',
            tabBarIcon: () => <IconSymbol size={28} name="bell" color={"#faf3d5"} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Green chatbot',
            tabBarIcon: () => <IconSymbol size={28} name="bot" color={"#faf3d5"} />,
          }}
        />
      </Tabs>
    </AlertProvider>
  );
}
