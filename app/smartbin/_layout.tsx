// app/(tabs)/_layout.tsx (or wherever your TabLayout lives)
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { AlertProvider, useAlert } from '@/components/AlertContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AlertProvider>
      <TabsWithAlerts colorScheme={colorScheme ?? null} />
    </AlertProvider>
  );
}

function TabsWithAlerts({ colorScheme }: { colorScheme: 'light' | 'dark' | null }) {
  const { alerts } = useAlert(); // ✅ inside provider

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: 'Super Smart Bin',
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: '#41744e' },
        headerTintColor: '#faf3d5',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 30 },
        headerLeftContainerStyle: { marginRight: 16 },
        headerLeft: () => (
          <Pressable onPress={() => router.replace('/')} style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={24} color="#faf3d5" />
          </Pressable>
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: { backgroundColor: '#41744e' },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={'#faf3d5'} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: () => <IconSymbol size={28} name="query-stats" color={'#faf3d5'} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          // 👇 Show badge only when there are alerts
          tabBarBadge: alerts.length > 0 ? alerts.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#dc2626', // red-ish
            color: '#fff',
            minWidth: 18,
            height: 18,
            lineHeight: 18,
            fontSize: 12,
            textAlign: 'center',
          },
          tabBarIcon: () => <IconSymbol size={28} name="bell" color={'#faf3d5'} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Green chatbot',
          tabBarIcon: () => <IconSymbol size={28} name="bot" color={'#faf3d5'} />,
        }}
      />
    </Tabs>
  );
}
