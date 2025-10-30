import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../../contexts/theme-context';
import { Alarm } from '../../../types/alarm';
import Text from '../../../components/base/Text';
import { translations } from '../../../utils/i18';
import { useConfig } from '../../../contexts/config-context';
import { useAlarms } from '../../../contexts/alarms-context';
import { Edit, Play, Xmark } from 'iconoir-react-native';
import { AlarmStackParamList } from '../../../types/root-stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Title from '../../base/Title';

type AlarmDisplayProps = {
  item: Alarm;
};

type AlarmsScreenNavigationProp = NativeStackNavigationProp<AlarmStackParamList, 'Alarms'>;

export default ({ item }: AlarmDisplayProps) => {
  const { theme } = useTheme();
  const { removeAlarm, activateAlarm } = useAlarms();
  const { navigate } = useNavigation<AlarmsScreenNavigationProp>();

  const { config: { language } } = useConfig();
  const texts = translations[language];
  const alarmsText = texts.alarms;
  const alarmText = alarmsText.alarm;

  const iconConfig = {
    width: 22,
    height: 22,
    color: theme.text.primary
  }

  const onEdit = () => {
    navigate('Create', { alarmId: item.id });
  };

  const onActive = (alarmId: string) => {
    activateAlarm(alarmId);
    navigate('Active');
  }

  const onDelete = (alarmId: string) => {
    Alert.alert(
      alarmsText.delete.title,
      alarmsText.delete.question,
      [
        { text: alarmsText.delete.cancel, style: 'cancel' },
        {
          text: alarmsText.delete.ok,
          style: 'destructive',
          onPress: () => removeAlarm(alarmId),
        },
      ]
    );
  };

  return (
    <View style={[styles.item, { borderColor: theme.text.primary }]}>

      <View style={styles.info}>
        <Title>{item.title}</Title>
        <Text>{alarmText.duration}: {item.duration} min</Text>
        {item.list?.length > 0 && <Text>{alarmText.list}: {item.list.join(', ')}.</Text>}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Edit {...iconConfig} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onActive(item.id)}>
          <Play {...iconConfig} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Xmark {...iconConfig} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    marginBottom: 8,
    maxWidth: '60%',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});
