import type { QueryClient } from '@tanstack/react-query';
import { produce, type Draft } from 'immer';
import { queryClient } from '@/shared/api';
import type { ProfileByUserIdResponse } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { getGetUserProfileByUserIdUserIdGetQueryKey } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import {
  CacheDescriptor,
  type ReplaceOptions,
} from '@/shared/model/cache-descriptor';

/**
 * Инкапсулирует работу с кешем профиля пользователя по `user_id`.
 * Дает единый API для чтения и локального обновления query cache.
 */
export class UserByIdCacheDescriptor extends CacheDescriptor<
  ProfileByUserIdResponse,
  [data?: ProfileByUserIdResponse]
> {
  private static readonly instances = new WeakMap<
    QueryClient,
    Map<string, UserByIdCacheDescriptor>
  >();

  /**
   * Возвращает singleton-инстанс дескриптора для пары
   * `queryClient + userId`.
   */
  static getInstance(userId: string, client: QueryClient = queryClient) {
    let clientInstances = this.instances.get(client);

    if (!clientInstances) {
      clientInstances = new Map();
      this.instances.set(client, clientInstances);
    }

    const existing = clientInstances.get(userId);
    if (existing) {
      return existing;
    }

    const descriptor = new UserByIdCacheDescriptor(userId, client);
    clientInstances.set(userId, descriptor);

    return descriptor;
  }

  private constructor(userId: string, client: QueryClient = queryClient) {
    super(userId, client);
  }

  /** Возвращает query key профиля пользователя по id. */
  getUserQueryKey() {
    return getGetUserProfileByUserIdUserIdGetQueryKey(this.cacheId);
  }

  /**
   * Возвращает профиль пользователя.
   * Если данные уже переданы снаружи, использует их.
   * Иначе читает точный query cache по текущему `user_id`.
   */
  search(data?: ProfileByUserIdResponse) {
    if (data) {
      return data;
    }

    return this.getExactCacheSnapshot<ProfileByUserIdResponse>(
      this.getUserQueryKey()
    );
  }

  /** Возвращает кеш профиля пользователя по текущему `user_id`. */
  getCache(data?: ProfileByUserIdResponse) {
    return this.search(data);
  }

  /**
   * Полностью заменяет профиль пользователя в точечном кеше.
   * По умолчанию проверяет полноту replacement-данных;
   * `forceReplace` отключает эту проверку.
   */
  async replace(
    predicate: (entity: ProfileByUserIdResponse) => boolean,
    data: Partial<ProfileByUserIdResponse>,
    options?: ReplaceOptions
  ) {
    await this.client.cancelQueries({
      queryKey: this.getUserQueryKey(),
    });

    this.client.setQueryData<ProfileByUserIdResponse>(
      this.getUserQueryKey(),
      (old) => {
        if (!old || !predicate(old)) {
          return old;
        }

        this.validateReplacementShape(old, data, options);

        return {
          ...data,
          data: {
            ...data.data,
            user_id: this.cacheId,
          },
        } as ProfileByUserIdResponse;
      }
    );

    return this.getUserQueryKey();
  }

  /** Обновляет профиль пользователя в кеше через Immer. */
  async update(updateFn: (draft: Draft<ProfileByUserIdResponse>) => void) {
    await this.client.cancelQueries({
      queryKey: this.getUserQueryKey(),
    });

    this.client.setQueryData<ProfileByUserIdResponse>(
      this.getUserQueryKey(),
      (old) => {
        if (!old) {
          return old;
        }

        return produce(old, (draft) => {
          updateFn(draft);
          draft.data.user_id = this.cacheId;
        });
      }
    );

    return this.getUserQueryKey();
  }
}
