import { authMiddleware } from '@/shared/middlewares/auth';
import type { ClientOptions, Middleware } from 'openapi-fetch';
import type { Services } from '../base-url';
import type { I$ApiRepository } from '../types/fetchers-repository.interface';
import { coupleOfFetchers } from './couple-of-fetchers';
import { typedQueryKey } from '../typed-querykey';

interface ServiceConfig {
  clientOption?: Omit<ClientOptions, 'baseUrl'>;
  middlewares?: Middleware[];
  authMiddleware?: Middleware;
}

const servicesConfig: Record<Services, ServiceConfig> = {
  user: { authMiddleware },
  feed: { authMiddleware },
  profile: { authMiddleware },
  chat: {},
  'chat/private': {
    authMiddleware,
    clientOption: { credentials: 'include' },
  },
  auth: {
    authMiddleware,
    clientOption: { credentials: 'include' },
  },
  socket: {
    authMiddleware,
    clientOption: { credentials: 'include' },
  },
  achievement: {
    authMiddleware,
    clientOption: { credentials: 'include' },
  },
};

type ServiceKey = keyof typeof servicesConfig;
const serviceKeys = Object.keys(servicesConfig) as ServiceKey[];

export const $api = serviceKeys.reduce<I$ApiRepository>((acc, key) => {
  const config = servicesConfig[key];
  return {
    ...acc,
    ...coupleOfFetchers(key, {
      autoBaseUrl: true,
      clientOption: config.clientOption ?? {},
      middlewares: config.middlewares,
      authMiddleware: config.authMiddleware,
    }),
  };
}, {} as I$ApiRepository);

$api.typedQueryKey = typedQueryKey;
