
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../../contexts/theme-context';
import { ReactNode } from 'react';

export default ({ children }: { children: ReactNode }) => {
  const { themeName } = useTheme();
  const navigationTheme = themeName === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
}

