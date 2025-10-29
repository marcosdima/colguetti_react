import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useConfig } from '../../contexts/config-context';
import { translations } from '../../utils/i18';
import Alarms from '../screens/alarms/Alarms';
import CreateAlarm from '../screens/alarms/CreateAlarm';
import ActiveAlarm from '../screens/alarms/ActiveAlarm';

const Stack = createNativeStackNavigator();

export default () => {
  const configHook = useConfig();
  const texts = translations[configHook.config.language];

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DisplayAlarms"
        component={Alarms}
        options={{ title: texts.alarms.title }}
      />
      <Stack.Screen
        name="Active"
        component={ActiveAlarm}
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
  );
}

