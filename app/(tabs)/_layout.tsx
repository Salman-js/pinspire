import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { Feather, Octicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Octicons size={25} name='home' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Feather size={28} name='search' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='new'
        options={{
          tabBarIcon: ({ color }) => (
            <Feather size={28} name='plus' color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {props.children}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
