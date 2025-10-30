import { useEffect } from 'react';
import MainNavigator from './components/navigation/MainNavigator';
import { AlarmProvider } from './contexts/alarms-context';
import { ConfigProvider } from './contexts/config-context';
import { ThemeProvider } from './contexts/theme-context';
import { setupNotifications } from './utils/notifications';

export default () => {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <ConfigProvider>
      <ThemeProvider>
        <AlarmProvider>
          <MainNavigator />
        </AlarmProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

