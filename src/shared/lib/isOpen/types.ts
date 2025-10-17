export interface UseSettingStoreState {
  isOpen: boolean;
}
export interface UseSettingStoreActions {
  toggle: () => void;
  open: () => void;
  close: () => void;
}
export type UseSettingStore = UseSettingStoreState & UseSettingStoreActions;
