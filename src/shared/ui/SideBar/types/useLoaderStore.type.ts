export interface UseLoaderState {
  isLoading: boolean;
}

export interface UseLoaderActions {
  setLoading: () => void;
  removeLoading: () => void;
}
export type UseLoaderStore = UseLoaderActions & UseLoaderState;
