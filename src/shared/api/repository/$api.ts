import { authMiddleware } from '@/shared/middlewares/auth';
import type { I$ApiRepositoryQuery } from '../types/fetchersRepository.interface';
import { coupleOfFetchers } from './coupleOfFetchers';

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
