import type { AnyFieldApi } from '@tanstack/react-form';
import type {
  ChangeEvent,
  ComponentProps,
  ReactNode,
} from 'react';

export interface FieldSet<K extends object>
  extends Pick<ComponentProps<'input'>, 'placeholder'> {
  name: keyof K;
  fieldName?: string;
  label?: boolean;

  component?: (
    field: AnyFieldApi,
    fSet: Omit<FieldSet<K>, 'component'>,
    props: {
      name: AnyFieldApi['name'];
      id: AnyFieldApi['name'];
      value: AnyFieldApi['state']['value'];
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
      onBlur: () => void;
    }
  ) => ReactNode;
}
