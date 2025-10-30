import { useUserStore } from '../user';

export const createdAt = () => {
  const createdAt = useUserStore.getState().created_at;

  const data = new Date(createdAt)
    .toLocaleString('ru-RU', {
      timeZone: 'UTC',
    })
    .split(',')[0];
  return data;
};
