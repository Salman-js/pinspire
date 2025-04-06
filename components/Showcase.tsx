import { Dimensions, Image as NativeImage, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MasonryFlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import tw from 'twrnc';
import { sampleImages } from '@/features/auth/constants/auth.constants';

export default function Showcase() {
  const [images, setImages] = useState<
    { url: string; width: number; height: number }[]
  >([]);
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const padding = 24;
  const columnWidth = (screenWidth - padding * 2) / numColumns - 8;

  useEffect(() => {
    const fetchImages = async () => {
      const imagesWithSizes: { url: string; width: number; height: number }[] =
        await Promise.all(
          sampleImages.map(async (img) => {
            return new Promise((resolve) => {
              NativeImage.getSize(
                img,
                (width, height) => {
                  const scaledHeight = (columnWidth * height) / width;
                  resolve({
                    url: img,
                    width,
                    height: scaledHeight,
                  });
                },
                (error) => {
                  resolve({
                    url: img,
                    width: 200,
                    height: 200,
                  });
                }
              );
            });
          })
        );
      setImages(imagesWithSizes);
    };

    fetchImages();
  }, [sampleImages, columnWidth]);
  return (
    <MasonryFlashList
      data={images}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View className='p-[5px]'>
          <Image
            source={{ uri: item.url }}
            style={[
              tw.style('w-full rounded-xl'),
              { height: item.height, overflow: 'hidden' },
            ]}
            contentFit='cover'
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      estimatedItemSize={200}
    />
  );
}
