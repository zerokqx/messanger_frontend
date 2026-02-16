export type ReplaceTypeKey<T, Extends = number, Replace = string> = {
  [K in keyof T]: T[K] extends Extends ? Replace : T[K];
};

type SettingsType = 'select' | 'checkbox';

export interface UseSettingsReturnType {
  type: SettingsType;
  label: string;
  key: string;
}

export type UseSettingsGet = () => UseSettingsReturnType[] | null;
