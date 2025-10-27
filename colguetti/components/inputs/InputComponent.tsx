import { View, Text, TextInput, StyleSheet, Button } from "react-native";

type InputProps = {
  value: string;
  setValue: (text: string) => void;
  onSave: () => void;
  label: string;
  placeholder: string;
  disableButton: boolean;
};

export default (
  {
    value,
    setValue,
    onSave,
    label,
    placeholder,
    disableButton,
  }: InputProps
) => {
  return (
    <View style={styles.contenedor}>
      <Text>{label}</Text>
      <View style={styles.input}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.inputText}
        />
        <Button
          title="save"
          onPress={onSave}
          disabled={disableButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {},
  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    borderWidth: 1,
    padding: 8,
    width: '70%',
  },
});