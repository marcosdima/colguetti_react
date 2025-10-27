import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useConfig } from "../../hooks/use-config";
import InputComponent from "../inputs/InputComponent";
import LanguagePanel from "../inputs/LanguagePanel";

export default () => {
  const { config: { alias } , saveAlias } = useConfig();
  const [auxAlias, setAuxAlias] = useState(alias);
  
  useEffect(() => {
    if (alias) setAuxAlias(alias)
  }, [alias]);

  const onUpdate = async () => {
    await saveAlias(auxAlias);
  }

  return (
    <View style={styles.contenedor}>
      <InputComponent
        value={auxAlias}
        setValue={setAuxAlias}
        onSave={onUpdate}
        label="Alias"
        placeholder="Type your alias"
        disableButton={alias === auxAlias}
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
    gap: 20,
  },
  input: {
    padding: 8,
  },
});