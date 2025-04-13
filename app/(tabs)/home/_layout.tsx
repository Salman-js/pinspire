import React from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NAV_THEME } from '@/lib/constants';

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen
        name='pin'
        options={{
          headerShown: true,
          header: (props) => (
            <View className='w-full flex flex-row justify-start p-4 bg-transparent absolute top-12 left-0 z-20'>
              <TouchableOpacity
                className='rounded-2xl shadow-md p-3 bg-white '
                onPress={props.navigation.goBack}
              >
                <Feather
                  name='chevron-left'
                  size={30}
                  color={NAV_THEME.light.text}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
