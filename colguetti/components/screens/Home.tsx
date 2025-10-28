import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../types/root-stack";
import { useConfig } from "../../contexts/config-context";
import Title from "../base/Title";
import SubTitle from "../base/SubTitle";
import Button from "../inputs/Button";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

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
      <Button text="Go to config" onPress={() => navigation.navigate('Configuration')} />
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
});
