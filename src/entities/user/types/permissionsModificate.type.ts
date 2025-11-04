export type ReplaceTypeKey<T, Extends = number, Replace = string> = {
  [K in keyof T]: T[K] extends Extends ? Replace : T[K];
};
