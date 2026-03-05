import { createStateContext } from 'react-use';

export const [, TabRepositoryProvider] = createStateContext<
  string[]
>([]);
