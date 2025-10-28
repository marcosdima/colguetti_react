import { View, StyleSheet } from "react-native";
import { useTheme } from "../../../contexts/theme-context";
import { Alarm } from "../../../types/alarm";
import Text from "../../../components/base/Text";

type AlarmDisplayProps = {
  item: Alarm;
};

export default ({item}: AlarmDisplayProps) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.item, { borderColor: theme.text }]}>
      <Text>{item.title}</Text>
      <Text>Duración: {item.duration} min</Text>
      <Text>Lista: {item.icons.join(', ')}.</Text>
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