import { useUserStore } from '..';

export const createdAt = () => {
  const createdAt = useUserStore.getState().data.created_at;
  const data = new Date(createdAt)
    .toLocaleString('ru-RU', {
      timeZone: 'UTC',
    })
    .split(',')[0];
  return data;
};

export const createdAtUserSearch = (data: string) => {
};
