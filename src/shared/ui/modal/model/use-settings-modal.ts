import { createIsOpenStore } from '@/shared/lib/is-open';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useSettingsModalBase = createIsOpenStore();
export const useSettingsModal = createSelectors(useSettingsModalBase);
