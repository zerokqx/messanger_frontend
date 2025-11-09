import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UseAppSettings } from '../types/useAppSettings.type';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useAppSettingsBase = create<UseAppSettings>()(
  persist(
    (set) => ({
      permanentPanel: false,

      setPermanentPanel(value) {
        set({ permanentPanel: value });
      },
      setborderElements(value) {
        set({ borderElements: value });
      },
    }),
    {
      name: 'app-settings',
    }
  )
);

export const useAppSettings = createSelectors(useAppSettingsBase);
