import type { Converter } from "./types";

export const convertValuesToString = <T extends Record<string, any>>(
  obj: T
): Converter<T, number, string> => {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      typeof v === 'number' ? String(v) : v,
    ])
  ) as Converter<T, number, string>;
};

