import MainNavigator from './components/navigation/MainNavigator';
import { AlarmProvider } from './contexts/alarms-context';
import { ConfigProvider } from './contexts/config-context';
import { ThemeProvider } from './contexts/theme-context';

export default () => {
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

