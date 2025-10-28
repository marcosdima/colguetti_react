import { View, StyleSheet } from "react-native";
import { useTheme } from "../../../contexts/theme-context";
import { Alarm } from "../../../types/alarm";
import Text from "../../../components/base/Text";
import { translations } from "../../../utils/i18";
import { useConfig } from "../../../contexts/config-context";

type AlarmDisplayProps = {
  item: Alarm;
};

export default ({item}: AlarmDisplayProps) => {
  const { theme } = useTheme();
  const { config: { language } } = useConfig();
  const texts = translations[language].alarms.alarm
  return (
    <View style={[styles.item, { borderColor: theme.text.primary }]}>
      <Text>{item.title}</Text>
      <Text>{texts.duration}: {item.duration} min</Text>
      { item.list?.length > 0 ? <Text>{texts.list}: {item.list.join(', ')}.</Text> : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
});