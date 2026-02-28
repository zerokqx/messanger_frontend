import { isArray } from 'lodash';
import type { VisibilityBaseProps } from '../ui/tabs.type';
import { useCurrentTab } from '../model';

export const whenStatus = (
  when: VisibilityBaseProps['when'],
  current: string
): boolean => {
  return typeof when === 'function'
    ? when(current)
    : isArray(when) && when.includes(current);
};

export const useWhenStatus = (when: VisibilityBaseProps['when']) => {
  const state = useCurrentTab();
  return whenStatus(when, state);
};
