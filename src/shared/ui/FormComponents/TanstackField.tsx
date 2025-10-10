import type {
  ReactFormApi,
  ReactFormExtendedApi,
  useForm,
} from '@tanstack/react-form';
import { FieldInfo } from '.';
import { StrictInput } from '../Input';
import type { ComponentProps } from 'react';

export function TanctackField<T extends ReturnType<typeof useForm>>({
  form,
  field,
  placeholder,
  label,
  ...props
}: { form: T } & Pick<ComponentProps<T['Field']>, 'name'> &
  ComponentProps<typeof StrictInput> &
  ComponentProps<typeof FieldInfo>) {
  return (
    <form.Field
      {...props}
      children={(field) => (
        <>
          <StrictInput placeholder={placeholder} />
          <FieldInfo label={label} field={field} />
        </>
      )}
    />
  );
}
