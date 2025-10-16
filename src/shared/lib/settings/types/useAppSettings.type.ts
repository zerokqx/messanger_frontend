export interface UseAppSettingsState {
  permanentPanel: boolean;
  borderElements: boolean;
}
export interface UseAppSettingsActions {
  setPermanentPanel: (value: boolean) => void;
  setborderElements: (value: boolean) => void;
}

export type UseAppSettings = UseAppSettingsActions & UseAppSettingsState;
