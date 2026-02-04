import { createLoaderStore } from '@/shared/lib/zustand/create-loader-store';

export const [useAsideLoader, asideLoaderActions, asideLoaderHooks] =
  createLoaderStore('loader-state-aside');
