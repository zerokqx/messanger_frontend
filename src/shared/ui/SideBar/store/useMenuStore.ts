import { createIsOpenStore } from '@/shared/lib/isOpen';
import { createSelectors } from '@/shared/lib/zustand/selectors';

const useSideBarStoreBase = createIsOpenStore();

export const useSideBarStore = createSelectors(useSideBarStoreBase);
