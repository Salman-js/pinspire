import React, { useEffect, useState } from 'react';
import { IPin } from '../interface/pin.interface';
import { MasonryFlashList } from '@shopify/flash-list';
import {
  Dimensions,
  Image as NativeImage,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import { Image } from 'expo-image';

type PinsGridProps = {
  pins: IPin[];
};

const PinsGrid: React.FC<PinsGridProps> = ({ pins }) => {
  const [images, setImages] = useState<
    { url: string; width: number; height: number }[]
  >([]);

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const padding = 24;
  const columnWidth = (screenWidth - padding * 2) / numColumns - 8;

  useEffect(() => {
    const fetchImages = async () => {
      const imagesWithSizes: { url: string; width: number; height: number }[] =
        await Promise.all(
          pins.map(async (img) => {
            return new Promise((resolve) => {
              NativeImage.getSize(
                img.url,
                (width, height) => {
                  const scaledHeight = (columnWidth * height) / width;
                  resolve({
                    url: img.url,
                    width,
                    height: scaledHeight,
                  });
                },
                (error) => {
                  resolve({
                    url: img.url,
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
  }, [pins, columnWidth]);
  return (
    <MasonryFlashList
      data={images}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <TouchableOpacity className='p-[5px]'>
          <Image
            source={{ uri: item.url }}
            style={[
              tw.style('w-full rounded-xl'),
              { height: item.height, overflow: 'hidden' },
            ]}
            contentFit='cover'
          />
        </TouchableOpacity>
      )}
      estimatedItemSize={200}
    />
  );
};
export default PinsGrid;
