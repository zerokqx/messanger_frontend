import type { components } from '@/shared/types/v1';

export type TUserState = components['schemas']['ProfileResponse']['data'];

export type ICurrentProfileContext = Partial<
  components['schemas']['ProfileData']
>;

export type ISearchProfileContext =
  components['schemas']['ProfileByUserIdData'];
