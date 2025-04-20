import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import {
  signInSchema,
  SignInSchema,
} from '@/features/auth/schema/sign-in.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signUpSchema,
  SignUpSchema,
} from '@/features/auth/schema/sign-up.schema';

export default function SignUpScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onSubmit = (data: SignInSchema) => console.log(data);
  return (
    <SafeAreaView className='px-4 py-24 flex flex-col justify-center gap-8'>
      <View className='flex flex-col gap-2'>
        <Text className='text-7xl text-blue-400'>Hello</Text>
        <Text className='text-7xl text-foreground'>there!</Text>
        <Text className='text-lg text-gray-400 dark:text-gay-600'>
          Create an account and enjoy the full experience of Pinspire. It's
          free!
        </Text>
      </View>
      <View className='w-full flex flex-col gap-4'>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex flex-row items-center border-none bg-muted rounded-2xl overflow-hidden gap-2 px-3'>
                <Ionicons
                  name='mail-outline'
                  size={22}
                  color={
                    isDarkColorScheme
                      ? NAV_THEME.dark.mutedText
                      : NAV_THEME.light.mutedText
                  }
                />
                <Input
                  placeholder='Email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType='email-address'
                  className='flex-1 bg-transparent'
                />
              </View>
            )}
            name='email'
          />
          {errors.email && (
            <Text className='text-red-500'>{errors.email.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex flex-row items-center border-none bg-muted rounded-2xl overflow-hidden gap-2 px-3'>
                <Ionicons
                  name='lock-closed-outline'
                  size={22}
                  color={
                    isDarkColorScheme
                      ? NAV_THEME.dark.mutedText
                      : NAV_THEME.light.mutedText
                  }
                />
                <Input
                  placeholder='Password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                  className='flex-1 bg-transparent'
                />
                <Button
                  onPress={() => setShowPassword(!showPassword)}
                  variant='ghost'
                  size='icon'
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color={
                      isDarkColorScheme
                        ? NAV_THEME.dark.mutedText
                        : NAV_THEME.light.mutedText
                    }
                  />
                </Button>
              </View>
            )}
            name='password'
          />
          {errors.password && (
            <Text className='text-red-500'>{errors.password.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex flex-row items-center border-none bg-muted rounded-2xl overflow-hidden gap-2 px-3'>
                <Ionicons
                  name='lock-closed-outline'
                  size={22}
                  color={
                    isDarkColorScheme
                      ? NAV_THEME.dark.mutedText
                      : NAV_THEME.light.mutedText
                  }
                />
                <Input
                  placeholder='Retype Password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                  className='flex-1 bg-transparent'
                />
              </View>
            )}
            name='confirmPassword'
          />
          {errors.confirmPassword && (
            <Text className='text-red-500'>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
        <Button
          className='w-full rounded-2xl bg-blue-400 py-2'
          onPress={() => router.navigate('/(protected)/(tabs)/home')}
        >
          <Text className='text-white font-bold text-xl leading-6'>
            Sign up
          </Text>
        </Button>
      </View>
      <View className='flex flex-row justify-center items-center gap-3 px-3'>
        <View className='border-b border-gray-500 flex-1'></View>
        <Text className='text-foreground text-lg'>Or</Text>
        <View className='border-b border-gray-500 flex-1'></View>
      </View>
      <TouchableOpacity className='w-full flex flex-row items-center py-3 px-6 rounded-2xl bg-secondary'>
        <MaterialCommunityIcons
          name='google'
          size={22}
          color={isDarkColorScheme ? NAV_THEME.dark.text : NAV_THEME.light.text}
        />
        <View className='flex-1'>
          <Text className='text-foreground text-center text-xl font-bold leading-6'>
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
      <View className='flex flex-row items-center justify-center'>
        <Text className='text-lg text-gray-400 dark:text-gay-600'>
          Already have an account?
        </Text>
        <Button
          variant='link'
          size='sm'
          className=''
          onPress={() => router.navigate('/(auth)/sign-in')}
        >
          <Text className='text-lg text-foreground'>Sign in</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
