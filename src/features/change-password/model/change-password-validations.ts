import { z } from 'zod';

export const createChangePasswordValidation = (samePasswordsMessage: string) =>
  z
    .object({
      oldPassword: z.string().nonempty(),
      newPassword: z.string().nonempty(),
    })
    .superRefine(({ newPassword, oldPassword }, ctx) => {
      if (newPassword === oldPassword) {
        ctx.addIssue({
          code: 'custom',
          message: samePasswordsMessage,
          path: ['newPassword'],
        });

        ctx.addIssue({
          code: 'custom',
          message: samePasswordsMessage,
          path: ['oldPassword'],
        });
      }
    });

export type PasswordsSchema = z.infer<
  ReturnType<typeof createChangePasswordValidation>
>;
