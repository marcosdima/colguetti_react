import { View, StyleSheet, TouchableOpacity } from 'react-native';
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

type AlarmDisplayProps = {
  item: Alarm;
};

type AlarmsScreenNavigationProp = NativeStackNavigationProp<AlarmStackParamList, 'Alarms'>;

export default ({ item }: AlarmDisplayProps) => {
  const { theme } = useTheme();
  const { removeAlarm, activateAlarm } = useAlarms();
  const { navigate } = useNavigation<AlarmsScreenNavigationProp>();

  const { config: { language } } = useConfig();
  const texts = translations[language].alarms.alarm;


  const iconConfig = {
    width: 22,
    height: 22,
    color: theme.text.primary
  }

  const onEdit = () => {
    navigate('Create', { alarmId: item.id })
  };

  const onActive = (alarmId: string) => {
    activateAlarm(alarmId)
  }

  const onDelete = (alarmId: string) => {
    removeAlarm(alarmId)
  }

  return (
    <View style={[styles.item, { borderColor: theme.text.primary }]}>

      <View style={styles.info}>
        <Text>{item.title}</Text>
        <Text>{texts.duration}: {item.duration} min</Text>
        {item.list?.length > 0 && <Text>{texts.list}: {item.list.join(', ')}.</Text>}
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
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});
