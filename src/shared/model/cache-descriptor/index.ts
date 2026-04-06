import type { QueryClient } from '@tanstack/react-query';

export interface ReplaceOptions {
  forceReplace?: boolean;
}

/**
 * Базовый абстрактный дескриптор для работы с query cache.
 * Хранит идентификатор области кеша и экземпляр `QueryClient`.
 */
export abstract class CacheDescriptor<
  TEntity,
  TSearchArgs extends unknown[] = unknown[],
> {
  protected constructor(
    protected readonly cacheId: string,
    protected readonly client: QueryClient
  ) {}

  /**
   * Возвращает снапшот всех query cache entries, подходящих под `queryKey`.
   * Это низкоуровневый helper для доменных дескрипторов.
   */
  protected getCacheSnapshot<T>(queryKey: readonly unknown[]) {
    return this.client.getQueriesData<T>({
      queryKey,
    });
  }

  /**
   * Возвращает снапшот одной точной query cache entry по `queryKey`.
   * Это низкоуровневый helper для доменных дескрипторов.
   */
  protected getExactCacheSnapshot<T>(queryKey: readonly unknown[]) {
    return this.client.getQueryData<T>(queryKey);
  }

  /**
   * Поверхностно проверяет, что replacement-данные содержат все ключи
   * текущей сущности. Нужна для безопасного `replace`.
   */
  protected validateReplacementShape(
    current: TEntity,
    next: Partial<TEntity>,
    options?: ReplaceOptions
  ): asserts next is TEntity {
    if (options?.forceReplace) {
      return;
    }

    const currentKeys = Object.keys(current as object);
    const nextKeys = new Set(Object.keys(next as object));
    const missingKeys = currentKeys.filter((key) => !nextKeys.has(key));

    if (missingKeys.length) {
      throw new Error(
        `Replacement payload is missing keys for cache entity "${this.cacheId}": ${missingKeys.join(', ')}`
      );
    }
  }

  /**
   * Ищет сущность либо в переданных данных, либо в query cache.
   * Конкретная сигнатура зависит от доменного дескриптора.
   */
  abstract search(...args: TSearchArgs): TEntity | undefined;

  /**
   * Полностью заменяет найденную сущность в кеше.
   * Конкретная реализация зависит от формы доменного кеша.
   */
  abstract replace(
    predicate: (entity: TEntity) => boolean,
    data: Partial<TEntity>,
    options?: ReplaceOptions
  ): Promise<unknown>;
}
