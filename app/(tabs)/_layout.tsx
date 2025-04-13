import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { Feather, Foundation, Ionicons, Octicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';
import tw from 'twrnc';
import NewButton from '@/features/home/components/NewButton';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: TabBarBackground,
        tabBarButton: (props) => <Pressable {...props} />,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: tw.style('py-1 px-8'),
        }),
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Foundation size={30} name='home' color={color} />
            ) : (
              <Octicons size={30} name='home' color={color} />
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
            <Feather size={30} name='plus' color={color} />
          ),
          tabBarButton: (props) => <NewButton {...props} />,
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          title: 'Notifications',
          headerShown: true,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons size={28} name='notifications' color={color} />
            ) : (
              <Ionicons size={28} name='notifications-outline' color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarButton: (props) => (
            <Pressable
              {...props}
              className='rounded-full'
              android_ripple={null}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1742201581091-68338e9f1669?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={[
                  tw.style('w-8 h-8 rounded-full'),
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
