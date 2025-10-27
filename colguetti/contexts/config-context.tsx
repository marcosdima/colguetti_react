import { createContext } from 'react';
import type { UseConfigType } from '../hooks/use-config'; // opcional para tipos

export const ConfigContext = createContext<UseConfigType | undefined>(undefined);
