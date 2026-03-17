import { useMemo } from 'react';

export const useCreatedAt = (createdAt: string) => {
  return useMemo<string>(() => {
    return (
      new Date(createdAt)
        .toLocaleString('ru-RU', {
          timeZone: 'UTC',
        })
        .split(',')[0] ?? ''
    );
  }, [createdAt]);
};
