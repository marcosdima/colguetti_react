import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

export default function Home() {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
      <Button title="Go to config" onPress={() => navigation.navigate('Configuration')} />
    </View>
  );
}