import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useConfig } from "../../hooks/use-config";
import InputComponent from "../inputs/InputComponent";
import LanguagePanel from "../inputs/LanguagePanel";
import { translations } from "../../utils/i18";

export default () => {
  const { config: { alias, language } , saveAlias } = useConfig();
  const [auxAlias, setAuxAlias] = useState(alias);
  const texts = translations[language]

  useEffect(() => {
    if (alias) setAuxAlias(alias)
  }, [alias]);

  const onUpdate = async () => {
    await saveAlias(auxAlias);
  }
  
  return (
    <View style={styles.contenedor}>
      <LanguagePanel/>
      <InputComponent
        value={auxAlias}
        setValue={setAuxAlias}
        onSave={onUpdate}
        label={texts.config.alias.label}
        placeholder={texts.config.alias.placeholder}
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