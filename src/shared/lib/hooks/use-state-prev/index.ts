import { usePrevious } from '@mantine/hooks';
import { useState } from 'react';

export const useStatePrev = <T>(
  initial: T
): [T, React.Dispatch<T>, T | undefined] => {
  const [state, setState] = useState<T>(initial);
  const previous = usePrevious(state);
  return [state, setState, previous];
};
