import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { HomeScreenNavigationProp } from "../../types/root-stack";
import { useConfig } from "../../contexts/config-context";
import Title from "../base/Title";
import SubTitle from "../base/SubTitle";
import Button from "../inputs/Button";
import { useAlarms } from "../../contexts/alarms-context";
import { useEffect } from "react";



export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { config } = useConfig();
  const { activeAlarm } = useAlarms();

  useEffect(() => {
    if (activeAlarm) {
      navigation.navigate('AlarmsNavigator', { screen: 'Active' });
    }
  }, [activeAlarm]);
  
  return (
    <View style={styles.container}>
      <Title>Main Screen</Title>
      <SubTitle>
        {
          config?.alias
            ? `Hi ${config.alias}!`
            : 'Hi there!'
        }
      </SubTitle>
      <View style={styles.buttons}>
        <Button text="Go to config" onPress={() => navigation.navigate('Configuration')} />
        <Button text="Go to alarms" onPress={() => navigation.navigate('AlarmsNavigator', { screen: 'Alarms' })} />
        {activeAlarm && <Button text="Go to active alarms" onPress={() => navigation.navigate('AlarmsNavigator', { screen: 'Active' })} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  buttons: {
    flex: 1,
    gap: 10,
    paddingTop: 20,
  }
});
