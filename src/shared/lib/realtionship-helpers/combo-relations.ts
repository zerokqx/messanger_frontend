import { relations } from './compouned';
import type { Relationships } from './types';

type CompoundedRelationsState = {
  [K in keyof typeof relations]: boolean;
};

export const comboRelations = (
  relationship: Relationships
): CompoundedRelationsState => {
  const entries = Object.entries(relations) as [
    keyof typeof relations,
    (value: Relationships) => boolean,
  ][];

  return entries.reduce<CompoundedRelationsState>((acc, [key, fn]) => {
    acc[key] = fn(relationship);
    return acc;
  }, {} as CompoundedRelationsState);
};
