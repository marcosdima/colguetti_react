import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useConfigContext } from '../../contexts/config-context';

const LanguageSelector = () => {
  const { config: { language }, saveLanguage } = useConfigContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, language === 'en' ? styles.active : styles.inactive]}
        onPress={() => saveLanguage('en')}
      >
        <Text style={styles.text}>EN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, language === 'es' ? styles.active : styles.inactive]}
        onPress={() => saveLanguage('es')}
      >
        <Text style={styles.text}>ES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 10,
    borderRadius: 6,
    borderColor: '#aaa',
    borderWidth: 1,
    width: '20%',
  },
  active: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  inactive: {
    backgroundColor: '#9a9ea5',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LanguageSelector;
