export type Converter<T, Source, Target> = {
  [K in keyof T]: T[K] extends Source ? Target : T[K];
};
