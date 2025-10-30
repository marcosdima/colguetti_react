import { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '../../../contexts/theme-context'
import { useAlarms } from '../../../contexts/alarms-context'
import Text from '../../../components/base/Text'
import { scheduleAlarmNotification } from '../../../utils/notifications'
import { useConfig } from '../../../contexts/config-context'
import { translations } from '../../../utils/i18'

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
  const { theme } = useTheme();
  const { alarms, activeAlarm, updateSelectedItems } = useAlarms();
  const [remaining, setRemaining] = useState<number>(0);
  const { config: { language } } = useConfig();
  const texts = translations[language];
  
  if (!activeAlarm) return null;

  const alarm = alarms.find(a => a.id === activeAlarm.alarmId);
  if (!alarm) return null;

  useEffect(() => {
    setNotification();
  }, [activeAlarm]);

  useEffect(() => {
    const updateTime = () => {
      const elapsed = Math.floor((Date.now() - activeAlarm.startedAt) / 1000);
      const remainingTime = alarm.duration * 60 - elapsed;
      if (remainingTime < 0) clearInterval(interval);
      else setRemaining(remainingTime);
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [alarm, activeAlarm]);

  const minutes = Math.max(0, Math.floor(remaining / 60));
  const seconds = Math.max(0, remaining % 60);

  const setNotification = () => {
    const failed = activeAlarm.selectedItems.length < alarm.list.length;
    const notification = failed ? texts.notification.fail : texts.notification.success;
    
    const body = failed
      ? `${notification.body} ${alarm.list.filter((item) => !activeAlarm.selectedItems.includes(item))}`
      : notification.body;
    
    const elapsed = Math.floor((Date.now() - activeAlarm.startedAt) / 1000);
    const remainingTime = alarm.duration * 60 - elapsed;

    if (remainingTime > 0) scheduleAlarmNotification(notification.title, body, remainingTime);
  };

  return (
    <View style={[styles.container, { borderColor: theme.text.primary }]}>
      <Text style={styles.title}>{alarm.title}</Text>
      <Text>{minutes}:{seconds.toString().padStart(2, '0')}</Text>

      <View style={styles.list}>
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    margin: 12,
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
})
