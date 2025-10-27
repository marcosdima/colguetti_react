import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/screens/Home';
import Config from './components/screens/Config';
import { RootStackParamList } from './types';
import { useConfig } from './hooks/use-config';
import { ConfigContext } from './contexts/config-context';
import { translations } from './utils/i18';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const configHook = useConfig();
  const texts = translations[configHook.config.language];
  
  return (
    <ConfigContext.Provider value={configHook}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </ConfigContext.Provider>
  );
}

