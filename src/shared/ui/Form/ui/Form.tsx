import { Flex, Text } from '@mantine/core';
import { useForm } from '@tanstack/react-form';

import { CustomMantineButton } from '../../Button';
import { CustomMantineInput } from '../../Input';
import type { FormProps } from '../types';

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
      <Flex w={'full'} direction={'column'} justify={'center'} align={'center'}>
        <Text fw={700}>{title}</Text>
        <Flex direction={'column'} w={'max-content'} gap={'sm'} p="lg">
          {fieldSet.map((fieldData) => (
            <form.Field
              key={fieldData.placeholder}
              name={fieldData.name.toString()}
              children={(field) => (
                <CustomMantineInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  placeholder={fieldData.placeholder}
                />
              )}
            />
          ))}
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
