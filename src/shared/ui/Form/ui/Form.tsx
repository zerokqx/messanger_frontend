import { Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';

import { CustomMantineButton } from '../../Button';
import { CustomMantineInput } from '../../Input';
import type { FormProps } from '../types';
import type { ChangeEvent } from 'react';

export const Form = <O extends object>({
  options,
  fieldSet,
  title,
  buttonLabel,
}: FormProps<O>) => {
  const form = useForm({
    ...options,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <Flex direction={'column'} justify={'center'}>
        <Text fw={700}>{title}</Text>
        <Flex direction={'inherit'} w={'max-content'} gap={'sm'} p="lg">
          {fieldSet.map(({ component, name, placeholder }) => {
            const Input = component ?? CustomMantineInput;
            return (
              <form.Field
                key={placeholder}
                name={name.toString()}
                children={(field) => (
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.handleChange(e.target.value);
                    }}
                    placeholder={placeholder}
                  />
                )}
              />
            );
          })}
        </Flex>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <CustomMantineButton type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : (buttonLabel ?? 'Submit')}
            </CustomMantineButton>
          )}
        />
      </Flex>
    </form>
  );
};
