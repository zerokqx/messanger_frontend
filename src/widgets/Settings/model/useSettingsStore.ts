import { createIsOpenStore } from '@/shared/lib/isOpen';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useSettingsStoreBase = createIsOpenStore();
export const useSettingsStore = createSelectors(useSettingsStoreBase);
