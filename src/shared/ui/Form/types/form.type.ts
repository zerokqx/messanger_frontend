import type { AnyFormOptions } from '@tanstack/react-form';
import type { FieldSet } from './fieldSet.type';

export interface FormProps<O extends AnyFormOptions> {
  options: O;
  fieldSet: FieldSet<O['defaultValues']>[];
  title: string;
  buttonLabel?: string;
}
