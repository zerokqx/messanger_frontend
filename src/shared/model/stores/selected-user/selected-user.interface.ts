import type { components } from '@/shared/types/v1';

export interface IUseSelectedUserStore {
  user: components['schemas']['ProfileByUserIdData'] | null;
}
