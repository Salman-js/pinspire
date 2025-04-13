import { Image } from 'expo-image';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IMG } from '../../interface/pin.interface';
import tw from 'twrnc';
import { Feather } from '@expo/vector-icons';
import { NAV_THEME } from '@/lib/constants';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useRouter } from 'expo-router';

type PinItemProps = {
  item: IMG;
  colorScheme: 'dark' | 'light';
};

const PinItem: React.FC<PinItemProps> = ({ item, colorScheme }) => {
  const router = useRouter();
  const shareSheetRef = useRef<ActionSheetRef>(null);
  const handleOpenShareSheet = () => {
    shareSheetRef.current?.show();
  };
  const handleCloseShareSheet = () => {
    shareSheetRef.current?.hide();
  };
  return (
    <>
      <TouchableOpacity
        className='p-[2px] pb-0'
        onPress={() =>
          router.navigate({
            pathname: '/(tabs)/home/pin',
            params: {
              id: item.id,
              url: item.url,
            },
          })
        }
      >
        <Image
          source={{ uri: item.url }}
          style={[
            tw.style('w-full rounded-xl'),
            { height: item.height, overflow: 'hidden' },
          ]}
          contentFit='cover'
        />
        <View className='w-full flex flex-row justify-end px-1'>
          <TouchableOpacity className='' onPress={handleOpenShareSheet}>
            <Feather
              name='more-horizontal'
              size={23}
              color={
                colorScheme === 'dark'
                  ? NAV_THEME.dark.text
                  : NAV_THEME.light.text
              }
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
    </>
  );
};
export default PinItem;
