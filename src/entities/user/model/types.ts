import type {
  ProfileByUserIdData,
  ProfileData,
} from '@/shared/api/orval/profile-service/profile-service.schemas';

export type ICurrentProfileContext = Partial<ProfileData>;

export type ISearchProfileContext = ProfileByUserIdData;
