import { createIsOpenStore } from '@/shared/lib/isOpen';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';

export const useSideBarStore = createSelectorHooks(createIsOpenStore());
