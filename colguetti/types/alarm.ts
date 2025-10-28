export type Alarm = {
  id: string;
  title: string;
  duration: number;
  icons: string[];
};

export type ActiveAlarm = {
  alarmId: string;
  startedAt: number;
  icons: string[];
};
