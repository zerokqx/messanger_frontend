import { createLoaderStore } from '@/shared/lib/zustand/createLoaderStore';

export const [useAsideLoader, asideLoaderActions, asideLoaderHooks] =
  createLoaderStore('loader-state-aside');
