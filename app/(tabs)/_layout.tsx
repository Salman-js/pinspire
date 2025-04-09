import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';
import tw from 'twrnc';

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
      <Tabs.Screen
        name='notifications'
        options={{
          headerShown: true,
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name='notifications-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarButton: (props) => (
            <Pressable {...props} className='rounded-full overflow-hidden'>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1742201581091-68338e9f1669?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={[
                  tw.style('w-6 h-6 rounded-full'),
                  { overflow: 'hidden' },
                ]}
                contentFit='cover'
                contentPosition='center'
              />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
