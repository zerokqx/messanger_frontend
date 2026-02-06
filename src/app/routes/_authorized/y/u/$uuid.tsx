import { AppShellMain } from '@mantine/core';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import z from 'zod';

const LazyAside = lazy(() =>
  import('@/widgets/aside').then((m) => ({ default: m.Aside }))
);
export const Route = createFileRoute('/_authorized/y/u/$uuid')({
  parseParams: (params) => {
    if (!z.uuid().safeParse(params.uuid).success) {
      throw new Error('UUID not correct');
    }
    return { uuid: params.uuid };
  },
});

