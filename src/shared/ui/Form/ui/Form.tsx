import type { FieldSet } from '../types';
import { CustomMantineInput } from '../../Input';
import { Text, Flex } from '@mantine/core';
import { useForm, type AnyFormOptions } from '@tanstack/react-form';
import { CustomMantineButton } from '../../Button';

interface FormProps<O extends AnyFormOptions> {
  options: O;
  fieldSet: FieldSet<O['defaultValues']>[];
  title: string;
}

export const Form = <O extends AnyFormOptions>({
  options,
  fieldSet,
  title,
}: FormProps<O>) => {
  const form = useForm({
    ...options,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Flex
        w={'full'}
        direction={'column'}
        justify={'center'}
        align={'center'}
        h={'100vh'}
      >
        <Text fw={700}>{title}</Text>
        <Flex direction={'column'} w={'max-content'} gap={'sm'} p="lg">
          {fieldSet.map((fieldData) => (
            <form.Field
              name={fieldData.name.toString()}
              children={(field) => (
                <CustomMantineInput placeholder={fieldData.placeholder} />
              )}
            />
          ))}
        </Flex>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <CustomMantineButton type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </CustomMantineButton>
          )}
        />
      </Flex>
    </form>
  );
};
