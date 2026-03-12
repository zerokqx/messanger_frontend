import { createBaseUrl, type Services } from '../base-url';
import type { ICoupleFetchers } from '../types/fetchers-repository.interface';
import type { Client, ClientOptions, Middleware } from 'openapi-fetch';

import createNativeClient from 'openapi-fetch';
import createQueryClient, {
  type OpenapiQueryClient,
} from 'openapi-react-query';
import type { paths } from '@/shared/types/v1';
import { generalMiddleware } from '@/shared/middlewares/set-headers';

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

const applyMiddlewares = (
  client: Client<paths>,
  middlewares?: Middleware[]
) => {
  if (!middlewares || middlewares.length === 0) {
    return;
  }

  for (const middleware of middlewares) {
    client.use(middleware);
  }
};

const createCouple = (
  opts?: CoupleOptions['clientOption'],
  preHook?: (client: Client<paths>) => void
): OpenapiQueryClient<paths> => {
  const native = createNativeClient<paths>(opts);
  preHook?.(native);
  return createQueryClient<paths>(native);
};

export function coupleOfFetchers<Key extends Services>(
  key: Key,
  options: CoupleOptions
): ICoupleFetchers<Key> {
  const opts = options.autoBaseUrl
    ? { ...options.clientOption, baseUrl: createBaseUrl(key) }
    : options.clientOption;

  const queryClient = createCouple(opts, (client) => {
    applyMiddlewares(client, options.middlewares);
    client.use(generalMiddleware);
  });

  const jwtClient = createCouple(opts, (client) => {
    applyMiddlewares(client, options.middlewares);
    client.use(generalMiddleware);
    if (options.authMiddleware) client.use(options.authMiddleware);
  });

  return {
    [key]: { query: queryClient, jwt: jwtClient },
  } as ICoupleFetchers<Key>;
}
