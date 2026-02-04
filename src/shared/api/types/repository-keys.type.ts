import type { Services } from '../base-url';

export type TQueryFetcher<Name extends Services = Services> =
  `query${Capitalize<Name>}`;
export type TNativeFetcher<Name extends Services = Services> =
  `native${Capitalize<Name>}`;
export type TJwtFetcher<Name extends Services = Services> =
  `jwt${Capitalize<Name>}`;
