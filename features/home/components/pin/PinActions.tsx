import { Button } from '@/components/ui/button';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/useColorScheme';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import tw from 'twrnc';
import * as Haptics from 'expo-haptics';

type PinActionsProps = {
  pinId: string | undefined;
};

const PinActions: React.FC<PinActionsProps> = ({ pinId }) => {
  const { colorScheme } = useColorScheme();
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    if (!liked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setLiked(!liked);
  };
  const shareSheetRef = useRef<ActionSheetRef>(null);
  const handleOpenShareSheet = () => {
    shareSheetRef.current?.show();
  };
  const handleCloseShareSheet = () => {
    shareSheetRef.current?.hide();
  };
  return (
    <View className='w-full p-3 py-5 flex flex-row justify-between items-center'>
      <View className='flex flex-row justify-start items-center gap-4'>
        <TouchableOpacity
          className='p-1 flex flex-row items-center gap-2'
          onPress={handleLike}
        >
          {liked ? (
            <Octicons name='heart-fill' size={27} color='#e73e3e' />
          ) : (
            <Octicons
              name='heart'
              size={27}
              color={
                colorScheme === 'dark'
                  ? NAV_THEME.dark.text
                  : NAV_THEME.light.text
              }
            />
          )}
          <Text className='text-foreground text-base'>{liked ? 235 : 234}</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-1 flex flex-row items-center gap-2'>
          <Ionicons
            name='chatbubble-outline'
            size={27}
            color={
              colorScheme === 'dark'
                ? NAV_THEME.dark.text
                : NAV_THEME.light.text
            }
            style={{
              transform: 'rotate(270deg)',
            }}
          />
          <Text className='text-foreground text-base'>12</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-1'>
          <Ionicons
            name='share-social-outline'
            size={27}
            color={
              colorScheme === 'dark'
                ? NAV_THEME.dark.text
                : NAV_THEME.light.text
            }
            onPress={handleOpenShareSheet}
          />
        </TouchableOpacity>
        <TouchableOpacity className='p-1'>
          <Feather
            name='more-horizontal'
            size={27}
            color={
              colorScheme === 'dark'
                ? NAV_THEME.dark.text
                : NAV_THEME.light.text
            }
          />
        </TouchableOpacity>
      </View>
      <Button className='bg-red-500 rounded-xl' size='sm'>
        <Text className='text-white font-semibold text-lg px-3'>Save</Text>
      </Button>
      <ActionSheet
        ref={shareSheetRef}
        onClose={handleCloseShareSheet}
        containerStyle={tw.style('p-4 pb-8', {
          backgroundColor: '#353630',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        })}
      >
        <View className='flex flex-col items-center justify-center w-full gap-10'>
          <View className='w-full flex flex-row justify-start items-center gap-2'>
            <TouchableOpacity onPress={handleCloseShareSheet}>
              <Feather name='x' size={30} color={NAV_THEME.dark.text} />
            </TouchableOpacity>
            <Text className='text-white text-xl text-center font-semibold'>
              Share to
            </Text>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};
export default PinActions;
