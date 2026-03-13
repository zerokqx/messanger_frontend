import type { Fn } from '@/shared/types/utils/functions';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

type UseCacheDescriptorEditFn<T> = (updater: (draft: T) => void) => void;
type UseCacheDescriptorCommitFn<T> = (data: T) => void;

interface UseCacheDescriptorOptions {
  autoCommit?: boolean;
}
export type DescriptorImplementator<T, Args extends unknown[]> = Fn<
  Args extends []
    ? [options?: UseCacheDescriptorOptions]
    : [...args: Args, options?: UseCacheDescriptorOptions],
  [UseCacheDescriptorEditFn<T>, UseCacheDescriptorCommitFn<T>]
>;

/**
 * Универсальный хук для работы с кешем React Query.
 * Позволяет редактировать и коммитить данные по произвольному ключу.
 *
 * @param queryKey Ключ кеша React Query (массив или строка).
 * @param autoCommit Если true, изменения автоматически коммятся в кеш.
 * @returns [edit, commit] — функции для редактирования и явного коммита.
 */
export const useCacheDescriptor = <T>(
  queryKey: readonly unknown[],
  options?: UseCacheDescriptorOptions
): [UseCacheDescriptorEditFn<T>, UseCacheDescriptorCommitFn<T>] => {
  const client = useQueryClient();

  /**
   * Записывает данные в кеш React Query по указанному ключу.
   * @param data Данные, которые нужно сохранить.
   */
  const commit = (data: T) => {
    client.setQueryData(queryKey, data);
  };

  /**
   * Изменяет данные в кеше через immer draft.
   * @param updater Функция-обновитель, получающая draft объекта.
   * Можно мутировать draft напрямую — immer создаст новую иммутабельную копию.
   */
  const edit = (updater: (draft: T) => void) => {
    const data = client.getQueryData<T>(queryKey);
    if (!data) {
      throw new Error('Data is not defined in cache');
    }

    const next = produce(data, updater);

    if (options?.autoCommit) {
      commit(next);
    }
  };

  return [edit, commit];
};
