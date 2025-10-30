import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useConfig } from '../../contexts/config-context'
import InputComponent from "../inputs/InputComponent";
import LanguagePanel from "../inputs/LanguagePanel";
import { translations } from "../../utils/i18";
import ThemeChanger from "../inputs/ThemeChanger";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.contenedor}>
      <LanguagePanel/>
      <ThemeChanger/>
      <InputComponent
        value={auxAlias}
        setValue={setAuxAlias}
        onSave={onUpdate}
        label={texts.config.alias.label}
        placeholder={texts.config.alias.placeholder}
        disableButton={alias === auxAlias}
      />
    </SafeAreaView>
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