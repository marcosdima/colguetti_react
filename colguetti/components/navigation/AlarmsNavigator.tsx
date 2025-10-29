import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useConfig } from '../../contexts/config-context';
import { translations } from '../../utils/i18';
import Alarms from '../screens/alarms/Alarms';
import { AlarmProvider } from '../../contexts/alarms-context';
import CreateAlarm from '../screens/alarms/CreateAlarm';

const Stack = createNativeStackNavigator();

export default () => {
  const configHook = useConfig();
  const texts = translations[configHook.config.language];

  return (
    <AlarmProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="DisplayAlarms"
          component={Alarms}
          options={{ title: texts.alarms.title }}
        />
        <Stack.Screen
          name="Create"
          component={CreateAlarm}
          options={
            ({ route }: { route: { params?: { alarmId?: string } } }) => ({
              title: route.params?.alarmId
                ? texts.alarms.edit.title
                : texts.alarms.create.title
            })
          }
        />
      </Stack.Navigator>
    </AlarmProvider>
  );
}

