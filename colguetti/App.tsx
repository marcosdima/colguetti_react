import Navigator from './components/screens/Navigator';
import { ConfigProvider } from './contexts/config-context';

export default () => {
  return (
    <ConfigProvider>
        <Navigator />
    </ConfigProvider>
  );
}

