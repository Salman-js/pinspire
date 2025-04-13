import React from 'react';
import { View } from 'react-native';
import PinsGrid from './PinsGrid';
import { sampleImages } from '@/features/auth/constants/auth.constants';

type BoardPinsProps = {
  boardId: string;
};

const BoardPins: React.FC<BoardPinsProps> = ({ boardId }) => {
  const pins = sampleImages.map((img) => ({ url: img }));
  return (
    <View className='w-full h-full'>
      <PinsGrid pins={pins} />
    </View>
  );
};
export default BoardPins;
