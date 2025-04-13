import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { Button } from '@/components/ui/button';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/lib/useColorScheme';
import Showcase from '@/components/Showcase';
import { useRouter } from 'expo-router';

export default function Index() {
  const { toggleColorScheme } = useColorScheme();
  const router = useRouter();
  return (
    <SafeAreaView className='flex flex-col p-6 items-center justify-center'>
      <View className='h-3/5 w-full'>
        <Showcase />
      </View>
      <View className='h-2/5 w-full flex-col items-center justify-end gap-6'>
        <TouchableOpacity
          className='rounded-full bg-background shadow-md'
          onPress={toggleColorScheme}
        >
          <Image
            source={require('@/assets/images/adaptive-icon.png')}
            style={tw.style('w-28 h-28')}
            alt='Pinspire Logo'
            contentFit='fill'
          />
        </TouchableOpacity>
        <Text className='text-foreground text-4xl font-bold text-center leading-10'>
          Welcome to Pinspire
        </Text>
        <View className='w-full flex flex-col gap-3'>
          <Button
            className='w-full rounded-full bg-blue-400 py-2'
            onPress={() => router.navigate('/(auth)/sign-up')}
          >
            <Text className='text-white font-bold text-xl leading-6'>
              Sign up
            </Text>
          </Button>
          <Button
            className='w-full rounded-full bg-muted py-2'
            onPress={() => router.navigate('/(tabs)/home')}
          >
            <Text className='text-secondary-foreground font-bold text-xl leading-6'>
              Login
            </Text>
          </Button>
        </View>
        <Text className='text-foreground text-xl text-center'>
          By continuing, you agree to Pinspire's{' '}
          <Text className='font-bold'>Terms of Service</Text> and acknowledge
          you've read our <Text className='font-bold'>Privacy Policy,</Text>{' '}
          <Text className='font-bold'>Notice at collection</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
