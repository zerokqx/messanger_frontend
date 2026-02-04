import { authMiddleware } from '@/shared/middlewares/auth';
import type { I$ApiRepositoryQuery } from '../types/fetchers-repository.interface';
import { coupleOfFetchers } from './couple-of-fetchers';

export const $api = {
  ...coupleOfFetchers('user', {
    autoBaseUrl: true,
    clientOption: {},
    authMiddleware,
  }),
  ...coupleOfFetchers('feed', {
    autoBaseUrl: true,
    clientOption: {},
    authMiddleware,
  }),
  ...coupleOfFetchers('profile', {
    autoBaseUrl: true,
    clientOption: {},
    authMiddleware,
  }),
  ...coupleOfFetchers('chat', { autoBaseUrl: true, clientOption: {} }),
  ...coupleOfFetchers('auth', {
    autoBaseUrl: true,
    clientOption: {
      credentials: 'include',
    },
    authMiddleware,
  }),
} satisfies I$ApiRepositoryQuery;
