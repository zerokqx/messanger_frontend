import type { ComponentProps } from 'react';
import { useFormContext } from '../../model';

export const Form = ({ ...props }: ComponentProps<'form'>) => {
  const form = useFormContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // ← обязательно!
        void form.handleSubmit(); // ← вызывает твой onSubmit
      }}
      {...props}
    />
  );
};
