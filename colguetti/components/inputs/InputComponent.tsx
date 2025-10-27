import { View, Text, TextInput, StyleSheet, } from "react-native";
import Button from "./Button";
import { useConfig } from "../../hooks/use-config";
import { translations } from "../../utils/i18";

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
  const { config: { language } } = useConfig();
  const texts = translations[language];

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
        <View style={styles.buttonWrapper}>
          <Button
            onPress={onSave}
            disabled={disableButton}
            text={texts.actions.save}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputText: {
    borderWidth: 1,
    padding: 8,
    width: '70%',
  },
  buttonWrapper: {
    width: '30%',
    paddingLeft: 10,
  }
});