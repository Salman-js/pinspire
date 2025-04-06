import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { setAndroidNavigationBar } from './android-navigation-bar';

export function useColorScheme() {
  const { colorScheme, setColorScheme } = useNativewindColorScheme();

  function toggleColorScheme() {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }
  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
