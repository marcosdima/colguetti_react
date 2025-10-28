import { createContext, ReactNode, useContext } from 'react';
import { useConfig, type UseConfigType } from '../hooks/use-config'; // opcional para tipos

export const ConfigContext = createContext<UseConfigType | undefined>(undefined);


export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const value = useConfig();
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfigContext = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfigContext must be used within ConfigProvider');
  return ctx;
};