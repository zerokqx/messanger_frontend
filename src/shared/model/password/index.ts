import z from 'zod';

export const password = z
  .string()
  .min(8, 'Пароль должен быть минимум 8 символов');
