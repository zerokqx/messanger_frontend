export interface UseTokenStoreActions {
  setToken: (token: string) => void;
  validateToken: (token?: string) => boolean;
  clearStore: () => void;
}
export interface UseTokenStoreState {
  access: string;
}

export type UseTokenStore = UseTokenStoreActions & UseTokenStoreState;
