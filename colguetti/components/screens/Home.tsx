import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Button } from "react-native";
import { RootStackParamList } from "../../types";
import { useConfig } from "../../contexts/config-context";
import Text from "../base/Text";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { config } = useConfig();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
      <Button title="Go to config" onPress={() => navigation.navigate('Configuration')} />
      {
        config?.alias
          ? <Text>Hi {config.alias}!</Text>
          : <Text>Hi there!</Text>
      }
    </View>
  );
}