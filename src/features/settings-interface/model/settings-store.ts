import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SettingsStoreState {
  animations: 'spring' | 'keyframes';
  primaryColor: string;
  withAnimations: boolean;
}

export const useSettingsStore = createStore<SettingsStoreState>(
  'settings',
  { animations: 'spring', primaryColor: 'blue', withAnimations: true },
  { persist: { getStorage: () => AsyncStorage } }
);
