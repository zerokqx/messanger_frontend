interface UseMenuStoreState {
  isOpen: boolean;
}

interface UseMenuStoreActions {
  toggle: () => void;
  open: () => void;
  close: () => void;
}
export type UseMenuStore = UseMenuStoreState & UseMenuStoreActions;
