import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Configuration: undefined;
  AlarmsNavigator: undefined;
};

export type AlarmStackParamList = {
  Alarms: undefined;
  Create: { alarmId?: string };
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type AlarmsScreenNavigationProp = NativeStackNavigationProp<AlarmStackParamList, 'Alarms'>;
export type CreateScreenNavigationProps = NativeStackNavigationProp<AlarmStackParamList, 'Create'>;

export type CreateRouteProp = RouteProp<AlarmStackParamList, 'Create'>;