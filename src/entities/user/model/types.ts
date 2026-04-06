import type {
  ProfileByUserIdData,
  ProfileData,
  ProfileResponse,
} from '@/shared/api/orval/profile-service/profile-service.schemas';

export type TUserState = ProfileResponse['data'];

export type ICurrentProfileContext = Partial<ProfileData>;

export type ISearchProfileContext = ProfileByUserIdData;
