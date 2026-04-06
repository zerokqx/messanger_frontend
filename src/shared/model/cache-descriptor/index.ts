import type { QueryClient } from '@tanstack/react-query';

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
   * Ищет сущность либо в переданных данных, либо в query cache.
   * Конкретная сигнатура зависит от доменного дескриптора.
   */
  abstract search(...args: TSearchArgs): TEntity | undefined;
}
