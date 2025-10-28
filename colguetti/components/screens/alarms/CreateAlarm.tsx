import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../../components/inputs/Button';
import Text from '../../../components/base/Text';
import { useTheme } from '../../../contexts/theme-context';
import { useAlarms } from '../../../contexts/alarms-context';
import TextInput from '../../inputs/TextInput';
import { useConfig } from '../../../contexts/config-context';
import { translations } from '../../../utils/i18';
import Chips from '../../inputs/Chips';

export default () => {
  const { theme } = useTheme();
  const { addAlarm } = useAlarms();
  const { config: { language } } = useConfig();
  const texts = translations[language]
  const fields = texts.alarms.create.fields

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [item, setItem] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const removeItem = (target: string) => {
    setItems(items.filter((item) => item !== target));
  }

  const addItem = (newItem: string) => {
    if (!items.includes(newItem)) setItems(items.concat(newItem));
    setItem('');
  }

  const handleAdd = () => {
    if (!title || !duration) return;
    const data = {
      id: Date.now().toString(),
      title,
      duration: parseInt(duration, 10),
      list: items,
    };
    addAlarm(data);
    setTitle('');
    setDuration('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.fields}>
        <View>
          <Text style={styles.label}>{fields.title.label}</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={fields.title.placeholder}
          />
        </View>
        <View>
          <Text style={styles.label}>{fields.duration.label}</Text>
          <TextInput
            value={duration}
            onChangeText={setDuration}
            keyboardType='numeric'
            placeholder={fields.duration.placeholder}
          />
        </View>
        <View>
          <Text style={styles.label}>{fields.list.label}</Text>
          <TextInput
            value={item}
            onChangeText={setItem}
            keyboardType='numeric'
            placeholder={fields.list.placeholder}
            onSubmitEditing={() => addItem(item)}
          />
          <Chips items={items} onRemove={removeItem}/>
        </View>
      </View>
      <Button text={texts.actions.save} onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  fields: {
    gap: 12,
  },
  label: {
    fontSize: 16,
  },
});
