import type { components } from '@/shared/types/v1';

type TUser = components['schemas']['ProfileResponse']['data'];
export type TUserState = components['schemas']['ProfileResponse']['data'];

export type ICurrentProfileContext = Partial<
  components['schemas']['ProfileData']
>;

type ISearchProfileContext =
  components['schemas']['ProfileByUserIdData'];
