import { capitalize, forEach } from 'lodash';
import { createBaseUrl, type Services } from '../base-url';
import type { ICoupleFetchers } from '../types/fetchers-repository.interface';
import type { Client, ClientOptions, Middleware } from 'openapi-fetch';

import createNativeClient from 'openapi-fetch';
import createQueryClient, {
  type OpenapiQueryClient,
} from 'openapi-react-query';
import type { paths } from '@/shared/types/v1';
import { generalMiddleware } from '@/shared/middlewares/set-headers';
import { authMiddleware } from '@/shared/middlewares/auth';

type CoupleOptions =
  | {
      autoBaseUrl: true;
      clientOption: Omit<ClientOptions, 'baseUrl'>;
      middlewares?: Middleware[];
      authMiddleware?: Middleware;
    }
  | {
      autoBaseUrl?: false;
      clientOption: ClientOptions;
      middlewares?: Middleware[];
      authMiddleware?: Middleware;
    };

const applayMiddlewares = (
  client: Client<paths>,
  middlewares?: Middleware[]
) => {
  if (middlewares && middlewares.length > 0) {
    forEach(middlewares, (middleware) => {
      client.use(middleware);
    });
    return client;
  }
};

const createCouple = (
  opts?: CoupleOptions['clientOption'],
  preHook?: (client: Client<paths>) => void
): {
  query: OpenapiQueryClient<paths>;
  native: Client<paths>;
} => {
  const native = createNativeClient<paths>(opts);
  preHook?.(native);
  const query = createQueryClient<paths>(native);
  return { query, native };
};

export function coupleOfFetchers<Key extends Services>(
  key: Key,
  options: CoupleOptions
): ICoupleFetchers<Key> {
  const opts = options.autoBaseUrl
    ? { ...options.clientOption, baseUrl: createBaseUrl(key) }
    : options.clientOption;

  const defaultClients = createCouple(opts, (client) => {
    applayMiddlewares(client, options.middlewares);
    client.use(generalMiddleware);
  });

  const jwtClients = createCouple(opts, (client) => {
    applayMiddlewares(client, options.middlewares);
    client.use(generalMiddleware);
    if (options.authMiddleware) client.use(authMiddleware);
  });

  const nativeKey = `native${capitalize(key)}` as const;
  const queryKey = `query${capitalize(key)}` as const;
  const jwtKey = `jwt${capitalize(key)}` as const;

  return {
    [nativeKey]: defaultClients.native,
    [queryKey]: defaultClients.query,
    [jwtKey]: { query: jwtClients.query, native: jwtClients.native },
  } as ICoupleFetchers<Key>;
}
