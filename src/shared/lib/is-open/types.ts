import type { StoreApi, UseBoundStore } from 'zustand';

export interface UseModalStoreState {
  isOpen: boolean;
}
export interface UseModalStoreActions {
  toggle: () => void;
  open: () => void;
  close: () => void;
}
export type UseModalStore = UseModalStoreState & UseModalStoreActions;
export type FabricStores = (
  defaultState?: boolean
) => UseBoundStore<StoreApi<UseModalStore>>;
