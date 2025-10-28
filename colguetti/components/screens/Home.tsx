import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Button } from "react-native";
import { RootStackParamList } from "../../types/root-stack";
import { useConfig } from "../../contexts/config-context";
import Title from "../base/Title";
import SubTitle from "../base/SubTitle";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { config } = useConfig();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Title>Main Screen</Title>
      <Button title="Go to config" onPress={() => navigation.navigate('Configuration')} />
      <SubTitle>
        {
          config?.alias
            ? `Hi ${config.alias}!`
            : 'Hi there!'
        }
      </SubTitle>
    </View>
  );
}