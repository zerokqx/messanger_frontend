/**
 * @module Общии функции для работы с состоянием функции
 * Функция fetchMe используеться для пред загрузки данных в централизованом месте. Затем используеться хук useMe для доступа к данным и оптимистичным обновлениям
 */
import { queryClient } from '@/shared/api';
import {
  useCacheDescriptor,
  type DescriptorImplementator,
} from '@/shared/lib/cache-descriptor';
import {
  getGetMyProfileMeGetQueryKey,
  getGetMyProfileMeGetQueryOptions,
  useGetMyProfileMeGetSuspense,
} from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import type { ProfileData } from '@/shared/api/orval/profile-service/profile-service.schemas';

export const meQueryOptions = getGetMyProfileMeGetQueryOptions({
  query: { staleTime: 60 * 1000 },
});

/**
 * @description функция испльзуемая для загруки пользователя на уровне роутера
 *
 */
export const fetchMe = async () => {
  return await queryClient.ensureQueryData(meQueryOptions);
};

/**
 * @description Хук используеться для подписки и управленя состоянием данных пользователя в стадии постлоада который происходил в fetchMe функции.
 * fetchMe(loader) => useMe(components)
 */
export const useMe = () => {
  return useGetMyProfileMeGetSuspense({
    query: {
      select(response) {
        return response.data;
      },
      staleTime: 60 * 1000,
    },
  });
};


export const useMeUserId = () => {
  return useGetMyProfileMeGetSuspense({
    query: {
      select(response) {
        return response.data.user_id;
      },
      staleTime: Infinity,
    },
  });
};

export const useMeDescriptor: DescriptorImplementator<ProfileData, []> = (
  options
) => {
  return useCacheDescriptor(getGetMyProfileMeGetQueryKey(), options);
};
