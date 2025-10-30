import * as Notifications from 'expo-notifications'
import { getItem, saveItem } from './storage';

// TODO: Notifications will have a delay of 10s aprox. In the future I'll implement my own library.

const notificationIdKey = 'notificationId';

const getNotificationId = async () => await getItem(notificationIdKey)
const saveNotificationId = async (id: string) => await saveItem(notificationIdKey, id)

export const scheduleAlarmNotification = async (title: string, body: string, triggerSeconds: number) => {
  await cancelNotification();
  
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: new Date(Date.now() + (triggerSeconds * 1000)),
    },
  });
  
  await saveNotificationId(notificationId);
};

export const setupNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Permissions were not granted');
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  Notifications.addNotificationReceivedListener(
    () => saveNotificationId('')
  );
};

export const cancelNotification = async () => {
  const notificationId = await getNotificationId();
  notificationId && Notifications.cancelScheduledNotificationAsync(notificationId);
};
