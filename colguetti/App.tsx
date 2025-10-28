import MainNavigator from './components/navigation/MainNavigator';
import { ConfigProvider } from './contexts/config-context';
import { ThemeProvider } from './contexts/theme-context';

export default () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </ConfigProvider>
  );
}

