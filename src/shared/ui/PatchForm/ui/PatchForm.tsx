import { useForm } from '@tanstack/react-form';
import type { FieldSet } from '../../Form/types';
import { VisuallyHidden } from '@mantine/core';

export const usePatchForm = <T extends object>(
  form: T,
  fieldSet: FieldSet<T>[]
) => {
  const Form = useForm({
    defaultValues: form,
  });
  const getEdit = (key: keyof T) => {
    return (

    );
  };
};

usePatchForm(
  {
    d: '',
  },
  [
    {
      name: 'd',
    },
  ]
);
