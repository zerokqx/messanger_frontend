type SettingsType = 'select' | 'checkbox';
export interface UseSettingsReturnType {
  type: SettingsType;
  label: string;
  key: string;
}
export type UseSettingsGet = () => UseSettingsReturnType[];
