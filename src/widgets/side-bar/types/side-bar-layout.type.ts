import type { InjectProp } from '@/shared/providers/types';
import type { NavigateFn } from '@tanstack/react-router';
interface InjectFuntion {
  settings: () => void;
  navigate: NavigateFn;
}

export type SideBarLayoutProp = InjectProp<InjectFuntion>;
