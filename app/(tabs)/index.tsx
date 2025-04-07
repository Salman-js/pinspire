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
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarItem,
  TabBarIndicator,
} from 'react-native-tab-view';
import tw from 'twrnc';

export default function HomeScreen() {
  const layout = useWindowDimensions();
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
              <View className='flex-1 items-center justify-center'>
                <Text className='text-foreground'>{tab.title} Content</Text>
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
            indicatorContainerStyle={tw.style('rounded-full', {
              backgroundColor: 'transparent',
            })}
            renderTabBarItem={(props) => (
              <TabBarItem {...props} style={tw.style('', {})} />
            )}
            indicatorStyle={tw.style('rounded-full', {
              backgroundColor: NAV_THEME.dark.text,
              height: 2.5,
            })}
            style={tw.style('', {
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
