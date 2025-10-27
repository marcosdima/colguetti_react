import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

type InputProps = {
  value: string;
  setValue: (text: string) => void;
  onSave: () => void;
  label: string;
  placeholder: string;
};

function InputComponent({ value, setValue, onSave, label, placeholder }: InputProps) {
  return (
    <View style={styles.input}>
      <Text>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={{ borderWidth: 1, padding: 8, width: 200 }}
      />
      <Button
        title="save"
        onPress={onSave}
      />
    </View>
  );
}

export default function Config() {
  const [alias, setAlias] = useState('');

  // Check if there is a saved alias.
  useEffect(() => {
    const asyncCall = async () => {
      const savedAlias = await AsyncStorage.getItem('alias');
      if (savedAlias) setAlias(savedAlias)
    }
    asyncCall()
  }, [])

  const onUpdate = async () => {
    await AsyncStorage.setItem('alias', alias);
  }

  return (
    <View style={styles.contenedor}>
      <InputComponent
        value={alias}
        setValue={setAlias}
        onSave={onUpdate}
        label="Alias"
        placeholder="Type your alias"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  input: {
    padding: 8,
  },
});