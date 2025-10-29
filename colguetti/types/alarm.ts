export type Alarm = {
  id: string;
  title: string;
  duration: number;
  list: string[];
};

export type ActiveAlarm = {
  alarmId: string;
  startedAt: number;
  selectedItems: string[];
};
