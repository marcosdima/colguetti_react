import { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '../../../contexts/theme-context'
import { useAlarms } from '../../../contexts/alarms-context'
import Text from '../../../components/base/Text'
import { scheduleAlarmNotification } from '../../../utils/notifications'
import { useConfig } from '../../../contexts/config-context'
import { translations } from '../../../utils/i18'
import { SafeAreaView } from 'react-native-safe-area-context'
import Title from '../../base/Title'
import Button from '../../inputs/Button'
import { useNavigation } from '@react-navigation/native'
import Clock from '../../animations/Clock'
import Pop from '../../animations/Pop'

const ActiveAlarmItem = ({ item, selected, onSelect }: {
  item: string
  selected: boolean
  onSelect: (item: string) => void
}) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.text.primary : 'transparent',
          borderColor: theme.text.primary,
        },
      ]}
    >
      <Text style={{ color: selected ? theme.background : theme.text.primary }}>
        {item}
      </Text>
    </TouchableOpacity>
  )
}

export default () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { alarms, activeAlarm, updateSelectedItems, stopAlarm } = useAlarms();
  const { config: { language } } = useConfig();
  const texts = translations[language];
  
  if (!activeAlarm) return null;

  const alarm = alarms.find(a => a.id === activeAlarm.alarmId);
  if (!alarm) return null;

  useEffect(() => {
    const failed = activeAlarm.selectedItems.length < alarm.list.length;
    const notification = failed
      ? texts.notification.fail
      : texts.notification.success;
    
    const body = failed
      ? `${notification.body} ${
          alarm.list
          .filter((item) => !activeAlarm.selectedItems.includes(item))
          .join(', ')
        }.`
      : notification.body;
    
    const elapsed = Math.floor((Date.now() - activeAlarm.startedAt) / 1000);
    const remainingTime = alarm.duration * 60 - elapsed;

    if (remainingTime > 0) scheduleAlarmNotification(notification.title, body, remainingTime);
  }, [activeAlarm]);

  const onClear = () => {
    stopAlarm();
    navigation.goBack();
  }

  const elapsed = Math.floor((Date.now() - activeAlarm.startedAt) / 1000);
  const remainingTime = alarm.duration * 60 - elapsed;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, { borderColor: theme.text.primary }]}>
        <View style={styles.top}>
          <Title style={styles.title}>{alarm.title}</Title>
          <Clock initialSeconds={remainingTime > 0 ? remainingTime : 0}/>
        </View>
        <Pop style={styles.list}>
          {
            alarm.list.map(item => (
              <ActiveAlarmItem
                key={item}
                item={item}
                selected={activeAlarm.selectedItems.includes(item)}
                onSelect={updateSelectedItems}
              />
            ))
          }
        </Pop>
      </View>
      <Button text={texts.actions.clear} onPress={onClear}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
    justifyContent: 'space-between',
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 'auto',
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
})
