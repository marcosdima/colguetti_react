import { useContext, useEffect, useState } from 'react';
import { getItem, saveItem } from '../utils/storage';
import { ConfigContext } from '../contexts/config-context';

type Config = {
  alias: string;
};

export type UseConfigType = {
  config: Config,
  setAlias: (value: string) => void,
}

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context) return context;

  const [config, setConfig] = useState<Config>({
    alias: '',
  });

  const setField = (field: string, value: string) => setConfig({ ...config, [field]: value });

  useEffect(() => {
    (async () => {
      const newConfig = { ...config };
      for (const key of Object.keys(config) as (keyof Config)[]) {
        const saved = await getItem(key);
        if (saved) newConfig[key] = saved;
      }
      setConfig(newConfig);
    })();
  }, []);

  const saveField = async (field: string, value: string) => {
    setField(field, value);
    await saveItem(field, value);
  };

  const saveAlias = async (value: string) => saveField('alias', value);

  return {
    config,
    setAlias: saveAlias
  };
};
