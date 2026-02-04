import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/_authorized/y/$uuid')({
  parseParams: (params) => {
    if (!z.uuid().safeParse(params.uuid).success) {
      throw new Error('UUID not correct');
    }
    return { uuid: params.uuid };
  },
});
