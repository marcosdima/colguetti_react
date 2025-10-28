import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getItem, saveItem } from '../utils/storage';
import { lightTheme, darkTheme } from '../utils/theme';

type ThemeType = typeof lightTheme;
type ThemeName = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  themeName: ThemeName;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  useEffect(() => {
    (async () => {
      const stored = await getItem('theme');
      if (stored === 'dark' || stored === 'light') setThemeName(stored);
    })();
  }, []);

  const toggleTheme = async () => {
    const next = themeName === 'light' ? 'dark' : 'light';
    setThemeName(next);
    await saveItem('theme', next);
  };

  const theme = themeName === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
