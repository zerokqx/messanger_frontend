import type { ComponentProps } from 'react';

export interface FieldSet<K extends object>
  extends Pick<ComponentProps<'input'>, 'placeholder'> {
  name: keyof K;
}
