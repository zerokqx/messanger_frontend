import type { ComponentProps, ElementType } from 'react';

export interface FieldSet<K extends object>
  extends Pick<ComponentProps<'input'>, 'placeholder'> {
  name: keyof K;
  fieldName?: string;
  component?: ElementType;
}
