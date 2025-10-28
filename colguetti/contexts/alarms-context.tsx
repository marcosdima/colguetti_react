import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getItem, saveItem } from '../utils/storage';
import { Alarm, ActiveAlarm } from '../types/alarm';

const activeAlarmKey = 'activeAlarm'
const alarmsKey = 'alarms'

type AlarmContextType = {
  alarms: Alarm[];
  activeAlarm: ActiveAlarm | null;
  addAlarm: (alarm: Alarm) => Promise<void>;
  removeAlarm: (id: string) => Promise<void>;
  updateAlarm: (alarm: Alarm) => Promise<void>;
  activateAlarm: (id: string) => Promise<void>;
  stopAlarm: () => Promise<void>;
};

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [activeAlarm, setActiveAlarm] = useState<ActiveAlarm | null>(null);
  
  useEffect(() => {
    (async () => {
      const savedAlarms = await getItem(alarmsKey);
      if (savedAlarms) setAlarms(JSON.parse(savedAlarms));

      const savedActive = await getItem(activeAlarmKey);
      if (savedActive) setActiveAlarm(JSON.parse(savedActive));
    })();
  }, []);

  const persistAlarms = async (newAlarms: Alarm[]) => {
    setAlarms(newAlarms);
    await saveItem(alarmsKey, JSON.stringify(newAlarms));
  };

  const addAlarm = async (alarm: Alarm) => persistAlarms([...alarms, alarm]);

  const removeAlarm = async (id: string) => {
    const newAlarms = alarms.filter(a => a.id !== id);
    await persistAlarms(newAlarms);
  };

  const updateAlarm = async (alarm: Alarm) => {
    const newAlarms = alarms.map(a => (a.id === alarm.id ? alarm : a));
    await persistAlarms(newAlarms);
  };

  const activateAlarm = async (id: string) => {
    const active = { alarmId: id, startedAt: Date.now(), list: [] };
    setActiveAlarm(active);
    await saveItem(activeAlarmKey, JSON.stringify(active));
  };

  const stopAlarm = async () => {
    setActiveAlarm(null);
    await saveItem(activeAlarmKey, '');
  };

  return (
    <AlarmContext.Provider
      value={{
        alarms,
        activeAlarm,
        addAlarm,
        removeAlarm,
        updateAlarm,
        activateAlarm,
        stopAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarms = () => {
  const context = useContext(AlarmContext);
  if (!context) throw new Error('useAlarmContext must be used within an AlarmProvider');
  return context;
};
