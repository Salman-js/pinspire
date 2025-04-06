import React from 'react';
import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/ThemeToggle';

const Layout = () => {
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Sign In',
        }}
      />
      <Stack.Screen name='sign-up' options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
