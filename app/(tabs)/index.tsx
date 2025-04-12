import BoardPins from '@/features/home/components/BoardPins';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/useColorScheme';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';
import tw from 'twrnc';

export default function HomeScreen() {
  const tabOptions = [
    {
      key: 'for you',
      title: 'For You',
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      key: `tab${i + 1}`,
      title: `Tab ${i + 1}`,
    })),
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView style={tw`flex-1`}>
      <TabView
        navigationState={{ index: selectedIndex, routes: tabOptions }}
        renderScene={SceneMap(
          tabOptions.reduce((acc, tab) => {
            acc[tab.key] = () => (
              <View className='w-full h-full flex flex-col items-center justify-center'>
                <BoardPins boardId='1234' />
              </View>
            );
            return acc;
          }, {} as { [key: string]: () => JSX.Element })
        )}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor={
              colorScheme === 'dark'
                ? NAV_THEME.dark.text
                : NAV_THEME.light.text
            }
            inactiveColor={colorScheme === 'dark' ? '#ffffff81' : '#00000086'}
            indicatorContainerStyle={tw.style('rounded-full', {
              backgroundColor: 'transparent',
            })}
            renderTabBarItem={({ key, ...props }) => (
              <TabBarItem {...props} key={key} style={tw.style('', {})} />
            )}
            indicatorStyle={tw.style('rounded-full', {
              backgroundColor:
                colorScheme === 'dark'
                  ? NAV_THEME.light.border
                  : NAV_THEME.dark.border,
              height: 2.5,
            })}
            style={tw.style('mb-2', {
              backgroundColor: 'transparent',
            })}
            tabStyle={tw.style('w-auto')}
            scrollEnabled
          />
        )}
        onIndexChange={setSelectedIndex}
      />
    </SafeAreaView>
  );
}
