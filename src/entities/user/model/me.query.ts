import { produce, type Draft } from 'immer';
/**
 * @module Общии функции для работы с состоянием функции
 * Функция fetchMe используеться для пред загрузки данных в централизованом месте. Затем используеться хук useMe для доступа к данным и оптимистичным обновлениям
 */
import { queryClient } from '@/shared/api';
import { $api } from '@/shared/api/repository/$api';
import type { components } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';
import { clone, cloneDeep } from 'lodash';

const meQueryOptions = $api.jwtProfile.query.queryOptions(
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
const useUserQuery = () => {
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

type Me = components['schemas']['ProfileResponse'];
type UseMeDescriptorCommitFn = (me: Me) => void;
type UseMeDescriptorUpdaterFn = (me: Draft<Me>) => void;
type UseMeDescriptorEditFn = (updater: UseMeDescriptorUpdaterFn) => void;

/**
 * Хук для удобного управления состоянием текущего пользователя,
 * находящегося в cache TanStack Query (`/me`).
 *
 * Позволяет безопасно изменять данные пользователя через immer,
 * создавая новую иммутабельную версию объекта без ручного копирования.
 *
 * Используется для:
 * - optimistic updates
 * - локальных изменений данных пользователя
 * - обновления cache без повторного запроса к серверу
 *
 * @param autoCommit Если `true`, изменения автоматически сохраняются
 * в cache после выполнения `edit`. Если `false`, необходимо вызвать
 * `commit` вручную.
 *
 * @returns Кортеж из двух функций:
 *
 * - `edit(updater)` — изменяет пользователя через immer draft
 * - `commit(me)` — вручную записывает пользователя в cache
 *
 * @example
 * const [edit] = useMeDescriptor(true)
 *
 * edit(draft => {
 *   draft.data.login = "newLogin"
 * })
 *
 * @example
 * Ручной commit
 *
 * const [edit, commit] = useMeDescriptor(false)
 *
 * edit(draft => {
 *   draft.data.login = "newLogin"
 * })
 *
 * commit(updatedUser)
 */
export const useMeDescriptor = (
  autoCommit = false
): [UseMeDescriptorEditFn, UseMeDescriptorCommitFn] => {
  const client = useQueryClient();

  /**
   * Записывает новую версию пользователя в cache React Query.
   *
   * @param me Объект пользователя (`ProfileResponse`), который должен
   * быть сохранён в cache.
   */
  const commit: UseMeDescriptorCommitFn = (me) => {
    client.setQueryData(meQueryOptions.queryKey, me);
  };

  /**
   * Изменяет пользователя через immer draft.
   *
   * Внутри используется `produce`, поэтому можно мутировать `draft`
   * напрямую — immer создаст новую иммутабельную копию объекта.
   *
   * @param updater Функция-обновитель, получающая immer-draft пользователя.
   */
  const edit: UseMeDescriptorEditFn = (updater) => {
    const me = client.getQueryData<Me>(meQueryOptions.queryKey);
    if (!me) throw new Error('User is not defined');

    const next = produce(me, updater);

    if (autoCommit) commit(next);
  };

  return [edit, commit];
};
