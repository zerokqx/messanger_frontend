import { createStateContext } from 'react-use';

export const [useTabRepository, TabRepositoryProvider] = createStateContext<
  string[]
>([]);
