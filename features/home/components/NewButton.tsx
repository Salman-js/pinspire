import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, { useRef } from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import tw from 'twrnc';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/lib/constants';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewButton(props: BottomTabBarButtonProps) {
  const bottomSheetRef = useRef<ActionSheetRef>(null);
  const { colorScheme } = useColorScheme();
  const handleOpenSheet = (e: GestureResponderEvent) => {
    e.preventDefault();
    e.stopPropagation();
    bottomSheetRef.current?.show();
  };
  const handleCloseSheet = () => {
    bottomSheetRef.current?.hide();
  };
  return (
    <>
      <Pressable {...props} onPress={handleOpenSheet}>
        {props.children}
      </Pressable>
      <ActionSheet
        ref={bottomSheetRef}
        containerStyle={tw.style('p-6 pb-8', {
          backgroundColor: '#353630',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        })}
      >
        <View className='flex flex-col items-center justify-center w-full gap-10'>
          <View className='w-full flex flex-row justify-between items-center'>
            <View className='w-1/4'>
              <TouchableOpacity onPress={handleCloseSheet}>
                <Feather name='x' size={24} color={NAV_THEME.dark.text} />
              </TouchableOpacity>
            </View>
            <View className='flex-1'>
              <Text className='text-white text-xl text-center'>
                Start creating now
              </Text>
            </View>
            <View className='w-1/4'></View>
          </View>
          <View className='flex flex-row gap-4'>
            <View className='flex flex-col justify-center gap-2'>
              <TouchableOpacity className='p-6 rounded-3xl bg-neutral-500'>
                <AntDesign
                  name='pushpino'
                  size={30}
                  color={NAV_THEME.dark.text}
                  style={{
                    transform: 'rotate(45deg)',
                  }}
                />
              </TouchableOpacity>
              <Text className='text-white text-center'>Pin</Text>
            </View>
            <View className='flex flex-col justify-center gap-2'>
              <TouchableOpacity className='p-6 rounded-3xl bg-neutral-500'>
                <MaterialCommunityIcons
                  name='view-dashboard-outline'
                  size={30}
                  color={NAV_THEME.dark.text}
                />
              </TouchableOpacity>
              <Text className='text-white text-center'>Board</Text>
            </View>
          </View>
        </View>
      </ActionSheet>
    </>
  );
}
