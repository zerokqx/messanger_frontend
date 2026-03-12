import type { paths } from '@/shared/types/v1';
import type { OpenapiQueryClient } from 'openapi-react-query';
import type { Services } from '../base-url';

export interface IServiceFetchers {
  query: OpenapiQueryClient<paths>;
  jwt: OpenapiQueryClient<paths>;
}

export type I$ApiRepository = Record<Services, IServiceFetchers>;

export type ICoupleFetchers<Key extends Services> = Record<
  Key,
  IServiceFetchers
>;
