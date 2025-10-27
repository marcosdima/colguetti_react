import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../types";
import { useConfig } from "../hooks/use-config";

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