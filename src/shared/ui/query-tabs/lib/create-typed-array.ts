import type { TabsDeclaration, TabsDeclarationKeys } from '../model';

export const typedArray = <QueryKey extends TabsDeclarationKeys>(
  _queryKey: QueryKey,
  arr: TabsDeclaration[QueryKey][]
) => arr;
