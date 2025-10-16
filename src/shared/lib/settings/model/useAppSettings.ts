import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UseAppSettings } from '../types/useAppSettings.type';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useAppSettingsBase = create<UseAppSettings>()(
  persist(
    (set, get) => ({
      permanentPanel: false,
      borderElements: true,
      setPermanentPanel(value) {
        set({ permanentPanel: value });
      },
      setborderElements(value) {
        set({ borderElements: value });
      },
    }),
    {
      name: 'app-settings', // ключ для localStorage
      // можно указать опции сериализации если надо
    }
  )
);

export const useAppSettings = createSelectors(useAppSettingsBase);
