import { View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useImageSize } from '@/features/home/hooks/use-image-size';
import { Skeleton } from '@/components/ui/skeleton';
import PinsGrid from '@/features/home/components/pin/PinsGrid';
import { sampleImages } from '@/features/auth/constants/auth.constants';
import PinActions from '@/features/home/components/pin/PinActions';

export default function PinScreen() {
  const { pinId: id } = useLocalSearchParams<{
    pinId: string;
  }>();
  const { screenWidth, height, loading: sizeLoading } = useImageSize(id);
  const pins = sampleImages.map((img) => ({ url: img, id: img }));
  const url = id;
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='w-full'>
        {sizeLoading ? (
          <Skeleton className='h-1/2 w-full' />
        ) : (
          <Image
            source={{ uri: url }}
            style={tw.style('rounded-b-3xl', {
              height,
              width: screenWidth,
            })}
            contentFit='cover'
          />
        )}
        <PinActions pinId={id} />
        <View className='w-full h-full'>
          <PinsGrid pins={pins} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
