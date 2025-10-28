import Home from '../screens/Home';
import Config from '../screens/Config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useConfig } from '../../contexts/config-context';
import { translations } from '../../utils/i18';
import NavigationContainer from './NavigationContainer';
import AlarmsNavigator from './AlarmsNavigator';

const Stack = createNativeStackNavigator();

export default () => {
  const configHook = useConfig();
  const texts = translations[configHook.config.language];

  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="AlarmsNavigator"
          component={AlarmsNavigator}
          options={{
            title: texts.config.title,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

