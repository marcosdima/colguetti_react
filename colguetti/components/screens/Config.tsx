import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useConfig } from "../../hooks/use-config";

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
  const { config: { alias } , setAlias } = useConfig();
  const [auxAlias, setAuxAlias] = useState(alias);
  
  useEffect(() => {
    if (alias) setAuxAlias(alias)
  }, [alias]);

  const onUpdate = async () => {
    await setAlias(auxAlias);
  }

  return (
    <View style={styles.contenedor}>
      <InputComponent
        value={auxAlias}
        setValue={setAuxAlias}
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