import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='sign-in' />
      <Stack.Screen name='sign-up' />
    </Stack>
  );
};

export default Layout;
