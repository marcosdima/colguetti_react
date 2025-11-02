import { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useConfig } from '../../contexts/config-context';
import { useAlarms } from '../../contexts/alarms-context';
import { HomeScreenNavigationProp } from '../../types/root-stack';
import Title from '../base/Title';
import { Play, AlarmClock, Settings } from 'lucide-react-native';
import Text from '../base/Text';
import { useTheme } from '../../contexts/theme-context';
import GoUp from '../animations/GoUp';

const Card = ({
  icon: Icon,
  label,
  onPress,
  highlight,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  highlight?: boolean;
}) => {
  const { theme } = useTheme();
  const color = highlight ? theme.primary : theme.text.primary;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { borderColor: color }]}
    >
      <Icon size={28} color={color} />
      <Text style={{ color }}>{label}</Text>
    </TouchableOpacity>
  )
};

export default () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { config } = useConfig();
  const { activeAlarm } = useAlarms();

  useEffect(() => {
    if (activeAlarm) {
      navigation.navigate('AlarmsNavigator', { screen: 'Active' });
    }
  }, [activeAlarm]);

  return (
    <View style={styles.container}>
      <Title>{config?.alias ? `Hola, ${config.alias}` : 'Bienvenido'}</Title>
      <GoUp style={styles.cards}>
          <Card
            icon={AlarmClock}
            label='Alarmas'
            onPress={() =>
              navigation.navigate('AlarmsNavigator', { screen: 'Alarms' })
            }
          />

          <Card
            icon={Settings}
            label='Configuración'
            onPress={() => navigation.navigate('Configuration')}
          />

          {
            activeAlarm && (
              <Card
                icon={Play}
                label='Alarma activa'
                highlight={true}
                onPress={() =>
                  navigation.navigate('AlarmsNavigator', { screen: 'Active' })
                }
              />
            )
          }

      </GoUp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    gap: 30,
  },
  cards: {
    width: '90%',
    gap: 20,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
});
