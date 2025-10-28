import Home from './Home';
import Config from './Config';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useConfig } from '../../contexts/config-context';
import { translations } from '../../utils/i18';
import { useTheme } from '../../contexts/theme-context';

const Stack = createNativeStackNavigator();

export default () => {
  const configHook = useConfig();
  const texts = translations[configHook.config.language];
  const { themeName } = useTheme();

  const navigationTheme = themeName === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: texts.home.title }}
        />
        <Stack.Screen
          name="Configuration"
          component={Config}
          options={{ title: texts.config.title }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

