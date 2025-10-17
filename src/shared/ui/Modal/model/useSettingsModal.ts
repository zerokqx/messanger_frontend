import { createIsOpenStore } from '@/shared/lib/isOpen';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useSettingsModalBase = createIsOpenStore();
export const useSettingsModal = createSelectors(useSettingsModalBase);
