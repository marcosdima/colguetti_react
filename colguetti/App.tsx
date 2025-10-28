import { View } from 'react-native';
import Navigator from './components/screens/Navigator';
import { ConfigProvider } from './contexts/config-context';
import { ThemeProvider } from './contexts/theme-context';

export default () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </ConfigProvider>
  );
}

