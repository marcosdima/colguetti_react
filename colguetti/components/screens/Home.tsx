import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { HomeScreenNavigationProp } from "../../types/root-stack";
import { useConfig } from "../../contexts/config-context";
import Title from "../base/Title";
import SubTitle from "../base/SubTitle";
import Button from "../inputs/Button";



export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { config } = useConfig();
  
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
        <Button text="Go to alarms" onPress={() => navigation.navigate('AlarmsNavigator')} />
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
