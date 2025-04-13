import { useEffect, useState } from 'react';
import { Dimensions, Image } from 'react-native';

export const useImageSize = (url: string) => {
  const [imageSize, setImageSize] = useState<
    { width: number; height: number } | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 1;
  const padding = 0;
  const columnWidth = (screenWidth - padding * 2) / numColumns;

  useEffect(() => {
    const fetchImageSize = async () => {
      const size: { width: number; height: number } = await new Promise(
        (resolve) => {
          Image.getSize(
            url,
            (width, height) => {
              const scaledHeight = (columnWidth * height) / width;
              resolve({
                width,
                height: scaledHeight,
              });
            },
            (error) => {
              resolve({
                width: 200,
                height: 200,
              });
            }
          );
        }
      );
      setImageSize(size);
      setLoading(false);
    };
    fetchImageSize();
  }, [url]);

  return {
    loading,
    width: imageSize?.width,
    height: imageSize?.height,
    screenWidth,
  };
};
