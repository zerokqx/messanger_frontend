import type { Fn } from '@/shared/types/utils/functions';

export type TCreateStoreAction<Actions extends Fn[]> = Fn<[Actions, string[2]]>;
