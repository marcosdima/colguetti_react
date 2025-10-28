import { createContext, ReactNode, useContext } from 'react';
import { useEffect, useState } from 'react';
import { getItem, saveItem } from '../utils/storage';

type Config = {
  alias: string;
  language: 'es' | 'en';
};

const validLanguage = (value: string) => value === 'es' || value === 'en';

export const ConfigContext = createContext<UseConfigType | undefined>(undefined);

export type UseConfigType = {
  config: Config,
  saveAlias: (value: string) => Promise<void>;
  saveLanguage: (value: 'es' | 'en') => Promise<void>;
}

const useConfigContext = () => {
  const [config, setConfig] = useState<Config>({
    alias: '',
    language: 'en',
  });

  const setField = (field: string, value: string) => setConfig({ ...config, [field]: value });

  useEffect(() => {
    (async () => {
      const newConfig = { ...config };
      for (const key of Object.keys(config) as (keyof Config)[]) {
        const saved = await getItem(key);
        if (!saved) continue;

        if (key === 'language') {
          if (validLanguage(saved)) newConfig.language = saved;
        }
        else newConfig[key] = saved;
      }
      setConfig(newConfig);
    })();
  }, []);

  const saveField = async (field: string, value: string) => {
    setField(field, value);
    await saveItem(field, value);
  };

  const saveAlias = async (value: string) => saveField('alias', value);
  const saveLanguage = async (value: 'es' | 'en') => saveField('language', value);

  return {
    config,
    saveAlias,
    saveLanguage,
  };
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const value = useConfigContext();
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfigContext must be used within ConfigProvider');
  return ctx;
};