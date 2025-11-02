import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../contexts/theme-context';
import { useAlarms } from '../../../contexts/alarms-context';
import { useConfig } from '../../../contexts/config-context';
import { translations } from '../../../utils/i18';
import { CreateRouteProp } from '../../../types/root-stack';
import Button from '../../../components/inputs/Button';
import Text from '../../../components/base/Text';
import GoUp from '../../animations/GoUp';
import Chips from '../../inputs/Chips';
import TextInput from '../../inputs/TextInput';
import { error, success } from '../../../utils/toast';

export default () => {
  const { theme } = useTheme();
  const { updateAlarm, addAlarm, alarms } = useAlarms();
  const { config: { language } } = useConfig();
  
  const route = useRoute<CreateRouteProp>();
  const { alarmId } = route.params || {};

  const texts = translations[language]
  const fields = texts.alarms.create.fields

  // If alarm exists, then it's in edit mode.
  const alarm = alarms.find((item) => item.id === alarmId);

  const [title, setTitle] = useState(alarm?.title ?? '');
  const [duration, setDuration] = useState(alarm ? String(alarm.duration) : '');
  const [item, setItem] = useState('');
  const [items, setItems] = useState<string[]>(alarm?.list ?? []);

  const setError = (text: string) => {
    error('Error', text, 5000);
  }

  const addItem = (newItem: string) => {
    if (!newItem.trim()) {
      setError(texts.errors.invalidFields.list.valid);
      return;
    }
    if (items.includes(newItem)) {
      setError(texts.errors.invalidFields.list.unique);
      return;
    }
    
    setItems(items.concat(newItem));
    setItem('');
  }

  const handleAdd = () => {
    if (!title) {
      setError(texts.errors.requiredFields.title);
      return;
    }
    if (!duration) {
      setError(texts.errors.requiredFields.duration);
      return;
    }
    if (isNaN(parseInt(duration, 10))) {
      setError(texts.errors.invalidFields.duration);
      return;
    }

    const data = {
      id: Date.now().toString(),
      title,
      duration: parseInt(duration, 10),
      list: items,
    };

    if (alarm) {
      updateAlarm({ ...data, id: alarm.id });
      success(texts.alarms.create.success.title, texts.alarms.create.success.updated, 2000);
    }
    else {
      addAlarm(data)

      // Reset hooks.
      setTitle('');
      setDuration('');
      setItems([]);

      success(texts.alarms.create.success.title, texts.alarms.create.success.created, 2000);
    };
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <GoUp style={styles.fields}>
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
            placeholder={fields.list.placeholder}
            onSubmitEditing={() => addItem(item)}
          />
          <Chips
            items={items}
            onRemove={(target) => setItems(items.filter((item) => item !== target))}
            />
        </View>
      </GoUp>
      <Button
        text={texts.actions.save}
        onPress={handleAdd}
        disabled={!title || !duration}
      />
    </SafeAreaView>
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
