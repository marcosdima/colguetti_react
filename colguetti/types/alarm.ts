export type Alarm = {
  id: string;
  title: string;
  duration: number;
  icon: string;
};

export type ActiveAlarm = {
  alarmId: string;
  startedAt: number;
  icons: string[];
};
