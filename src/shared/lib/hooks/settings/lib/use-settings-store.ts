import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Settings } from '../model';

export const useSettingsStore = createStore<Settings>(
  'settings',
  {
    animations: 'spring',
    primaryColor: 'blue',
    withAnimations: true,
    duratationAllAnimations: 0.6,
  },
  { persist: { getStorage: () => AsyncStorage } }
);
