import type { paths } from '@/shared/types/v1';
import type { OpenapiQueryClient } from 'openapi-react-query';
import type { Services } from '../base-url';
import type { Client } from 'openapi-fetch';
import type {
  TJwtFetcher,
  TQueryFetcher,
  TNativeFetcher,
} from './repository-keys.type';

export type I$ApiRepositoryNative = Record<TNativeFetcher, Client<paths>>;
export type I$ApiJwtRepository = Record<
  TJwtFetcher,
  {
    native: Client<paths>;
    query: OpenapiQueryClient<paths>;
  }
>;

export type I$ApiRepositoryQuery = Record<
  TQueryFetcher,
  OpenapiQueryClient<paths>
> &
  I$ApiRepositoryNative &
  I$ApiJwtRepository;

export type ICoupleFetchers<Key extends Services> = Pick<
  I$ApiRepositoryNative,
  TNativeFetcher<Key>
> &
  Pick<I$ApiRepositoryQuery, TQueryFetcher<Key>> &
  Pick<I$ApiJwtRepository, TJwtFetcher<Key>>;
