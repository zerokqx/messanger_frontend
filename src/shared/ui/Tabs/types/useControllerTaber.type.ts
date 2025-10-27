import type { ControlTaber, Windows } from './taber.type';

export type UseControllerTaber<T extends Windows> = () => ControlTaber<
  T[number]
>;
