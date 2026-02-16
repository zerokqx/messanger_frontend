import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { supportAnimations } from '../config/support-animations';

export interface SettingsStoreState {
  animations: (typeof supportAnimations)[number];
  primaryColor: string;
  withAnimations: boolean;
}

export const useSettingsStore = createStore<SettingsStoreState>(
  'settings',
  { animations: 'spring', primaryColor: 'blue', withAnimations: true },
  { persist: { getStorage: () => AsyncStorage } }
);
