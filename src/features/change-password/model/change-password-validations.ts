import { z } from 'zod';

export const changePasswordValidation = z
  .object({
    oldPassword: z.string().nonempty(),
    newPassword: z.string().nonempty(),
  })
  .superRefine(({ newPassword, oldPassword }, ctx) => {
    if (newPassword === oldPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords must be different',
        path: ['newPassword'],
      });

      ctx.addIssue({
        code: 'custom',
        message: 'Passwords must be different',
        path: ['oldPassword'],
      });
    }
  });

export type PasswordsSchema = z.infer<typeof changePasswordValidation>;
