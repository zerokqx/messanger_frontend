import { password } from '@/shared/model/password';
import { z } from 'zod';

export const loginFormSchema = z.object({
  userName: z
    .string()
    .min(3, 'Должно быть не менее 3 символов')
    .max(32, 'Должно быть не более 32 символов')
    .refine((val) => !/\s/.test(val), 'Не должно содержать пробелов')
    .nonempty()
    .refine(
      (val) => !val.startsWith('_'),
      'Не должно начинаться с подчеркивания'
    )
    .refine(
      (val) => !val.includes('__'),
      'Не должно содержать двойных подчеркиваний'
    )
    .regex(/^[A-Za-z0-9_]+$/, 'Только английские буквы, цифры и подчеркивания')
    .nonoptional(),
  password,
});
