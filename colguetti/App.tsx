import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Config from './screens/Config';
import { RootStackParamList } from './types';
import { useConfig } from './hooks/use-config';
import { ConfigContext } from './contexts/config-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const configHook = useConfig()
  return (
    <ConfigContext.Provider value={configHook}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Configuration" component={Config} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConfigContext.Provider>
  );
}

