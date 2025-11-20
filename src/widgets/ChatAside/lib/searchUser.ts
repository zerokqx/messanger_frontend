import type { TUserState } from '@/entities/user/types/userStore.type';
import type { components } from '@/shared/types/v1';

export const searchUser = (
  users: components['schemas']['UserSearchResponse'],
  uuid: string
) => {
  return users.data.users.find((user) => {
    return user.user_id === uuid;
  }) as TUserState;
};
