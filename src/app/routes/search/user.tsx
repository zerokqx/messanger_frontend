import { loginFormSchema } from '@/features/login/model/loginSchema';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/search/user')({
  validateSearch: z.object({
    query: z.string(),
    uuid: z.uuid(),
  }),
});
