import { View, FlatList, StyleSheet } from "react-native";
import Text from "../../../components/base/Text";
import Button from "../../../components/inputs/Button";
import { useAlarms } from "../../../contexts/alarms-context";
import { AlarmStackParamList } from "../../../types/root-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AlarmDisplay from "./AlarmDisplay";
import { translations } from "../../../utils/i18";
import { useConfig } from "../../../contexts/config-context";


type AlarmsScreenNavigationProp = NativeStackNavigationProp<AlarmStackParamList, 'Alarms'>;


export default () => {
  const { navigate } = useNavigation<AlarmsScreenNavigationProp>();
  const { alarms, activeAlarm } = useAlarms();
  const { config: { language } } = useConfig();
  const texts = translations[language]

  const alarm = alarms.find((al) => al.id === activeAlarm?.alarmId);
  
  return (
    <View style={styles.container}>
      {
        alarm
        ? <Text>{texts.alarms.active.exists}: {alarm.title}</Text>
        : <Text>{texts.alarms.active.dontExists}</Text>
      }

      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlarmDisplay item={item}/>}
        style={styles.list}
      />

      <Button text={texts.alarms.button} onPress={() => navigate('Create')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    flex: 1,
    marginVertical: 12,
  },
  item: {
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
});
