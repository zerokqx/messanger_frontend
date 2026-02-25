/**
 * @module Общии функции для работы с состоянием функции
 * Функция fetchMe используеться для пред загрузки данных в централизованом месте. Затем используеться хук useMe для доступа к данным и оптимистичным обновлениям
 */
import { queryClient } from '@/shared/api';
import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';

export const meQueryOptions = $api.jwtProfile.query.queryOptions(
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
 * @description Устарело. Загрузка пользователя не происходит в компонентах
 * @deprecated
 * @see fetchMe
 * @link fetchMe
 */
export const useUserQuery = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<components['schemas']['ProfileData']>(
    meQueryOptions.queryKey
  );
};

/**
 * @description Хук используеться для подписки и управленя состоянием данных пользователя в стадии постлоада который происходил в fetchMe функции.
 * fetchMe(loader) => useMe(components)
 */
export const useMe = () => {
  return $api.jwtProfile.query.useSuspenseQuery(
    'get',
    '/me',
    {},
    { select: (data) => data.data, staleTime: 60 * 1000 }
  );
};
