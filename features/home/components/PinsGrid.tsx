import React, { useEffect, useState } from 'react';
import { IMG, IPin } from '../interface/pin.interface';
import { MasonryFlashList } from '@shopify/flash-list';
import { Dimensions, Image as NativeImage } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import PinItem from './PinItem';

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
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    const fetchImages = async () => {
      const imagesWithSizes: IMG[] = await Promise.all(
        pins.map(async (img) => {
          return new Promise((resolve) => {
            NativeImage.getSize(
              img.url,
              (width, height) => {
                const scaledHeight = (columnWidth * height) / width;
                resolve({
                  id: img.id,
                  url: img.url,
                  width,
                  height: scaledHeight,
                });
              },
              (error) => {
                resolve({
                  id: img.id,
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
        <PinItem item={item} colorScheme={colorScheme} />
      )}
      estimatedItemSize={200}
    />
  );
};
export default PinsGrid;
