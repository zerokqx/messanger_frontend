/**
 * @module Общии функции для работы с состоянием функции
 * Функция fetchMe используеться для пред загрузки данных в централизованом месте. Затем используеться хук useMe для доступа к данным и оптимистичным обновлениям
 */
import { queryClient } from '@/shared/api';
import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import {
  useCacheDescriptor,
  type DescriptorImplementator,
} from '@/shared/lib/cache-descriptor';

export const meQueryOptions = $api.profile.jwt.queryOptions(
  'get',
  '/me',
  {},
  { staleTime: 60 * 1000 }
);

/**
 * @description функция испльзуемая для загруки пользователя на уровне роутера
 *
 */
export const fetchMe = async () => {
  return queryClient.ensureQueryData(meQueryOptions);
};

/**
 * @description Хук используеться для подписки и управленя состоянием данных пользователя в стадии постлоада который происходил в fetchMe функции.
 * fetchMe(loader) => useMe(components)
 */
export const useMe = () => {
  return $api.profile.jwt.useSuspenseQuery(
    'get',
    '/me',
    {},
    { select: (data) => data.data, staleTime: 60 * 1000 }
  );
};

type Me = components['schemas']['ProfileResponse'];
export const useMeDescriptor: DescriptorImplementator<Me, []> = (options) => {
  return useCacheDescriptor(meQueryOptions.queryKey, options);
};
