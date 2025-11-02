import { ScrollView, StyleSheet } from "react-native";
import Text from "../../../components/base/Text";
import Button from "../../../components/inputs/Button";
import { useAlarms } from "../../../contexts/alarms-context";
import { AlarmsScreenNavigationProp } from "../../../types/root-stack";
import { useNavigation } from "@react-navigation/native";
import AlarmDisplay from "./AlarmDisplay";
import { translations } from "../../../utils/i18";
import { useConfig } from "../../../contexts/config-context";
import { SafeAreaView } from "react-native-safe-area-context";
import GoUp from "../../animations/GoUp";

export default () => {
  const { navigate } = useNavigation<AlarmsScreenNavigationProp>();
  const { alarms, activeAlarm } = useAlarms();
  const { config: { language } } = useConfig();
  const texts = translations[language]

  const alarm = alarms.find((al) => al.id === activeAlarm?.alarmId);
  
  return (
    <SafeAreaView style={styles.container}>
      {
        alarm
        ? <Text>{texts.alarms.active.exists}: {alarm.title}</Text>
        : <Text>{texts.alarms.active.dontExists}</Text>
      }

      <ScrollView style={styles.list}>
        <GoUp
          duration={700}
          yMovement={50}
        >
          {
            alarms.map((item) => (
              <AlarmDisplay key={item.id} item={item}/>
            ))
          }
        </GoUp>
      </ScrollView>

      <Button text={texts.alarms.button} onPress={() => navigate('Create', {})} />
    </SafeAreaView>
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
