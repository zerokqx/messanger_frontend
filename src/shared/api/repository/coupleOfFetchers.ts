import { capitalize } from 'lodash';
import { createBaseUrl, type Services } from '../baseUrl';
import type { ICoupleFetchers } from '../types/fetchersRepository.interface';
import type { ClientOptions, Middleware } from 'openapi-fetch';

import createNativeClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';
import type { paths } from '@/shared/types/v1';
import { generalMiddleware } from '@/shared/midlewares';

type CoupleOptions =
  | {
      autoBaseUrl: true;
      clientOption: Omit<ClientOptions, 'baseUrl'>;
      authMiddleware?: Middleware;
    }
  | {
      autoBaseUrl?: false;
      clientOption: ClientOptions;
      authMiddleware?: Middleware;
    };

export function coupleOfFetchers<Key extends Services>(
  key: Key,
  options: CoupleOptions
): ICoupleFetchers<Key> {
  const opts = options.autoBaseUrl
    ? { ...options.clientOption, baseUrl: createBaseUrl(key) }
    : options.clientOption;

  const nativeClient = createNativeClient<paths>(opts);
  nativeClient.use(generalMiddleware);
  const queryClient = createQueryClient<paths>(nativeClient);

  const jwtNativeClient = createNativeClient<paths>(opts);
  if (options.authMiddleware) jwtNativeClient.use(options.authMiddleware);
  jwtNativeClient.use(generalMiddleware);
  const jwtQueryClient = createQueryClient<paths>(jwtNativeClient);

  const nativeKey = `native${capitalize(key)}` as const;
  const queryKey = `query${capitalize(key)}` as const;
  const jwtKey = `jwt${capitalize(key)}` as const;

  return {
    [nativeKey]: nativeClient,
    [queryKey]: queryClient,
    [jwtKey]: { query: jwtQueryClient, native: jwtNativeClient },
  } as ICoupleFetchers<Key>;
}
