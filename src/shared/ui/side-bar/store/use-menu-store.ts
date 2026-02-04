import { createIsOpenStore } from '@/shared/lib/is-open';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';

export const useSideBarStore = createSelectorHooks(createIsOpenStore());
