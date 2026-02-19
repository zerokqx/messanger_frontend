import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsSchema, type Settings } from '../model';

export const useSettingsStore = createStore<Settings>(
  'settings',
  SettingsSchema.parse({}),
  { persist: { getStorage: () => AsyncStorage } }
);
