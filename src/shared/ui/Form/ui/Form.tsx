import { Flex, InputLabel, Loader, Text, TextInput } from '@mantine/core';
import { useForm } from '@tanstack/react-form';

import { getHotkeyHandler } from '@mantine/hooks';
import type { FormEvent } from 'react';
import { CustomMantineButton } from '../../buttons';
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
      onKeyDown={getHotkeyHandler([
        [
          'Enter',
          (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            void form.handleSubmit();
          },
        ],
      ])}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <Flex w={'100%'} direction={'column'} justify={'center'}>
        <Flex direction={'inherit'} w={'inherit'} gap={'sm'} p="lg">
          <Text fw={700} c={'blue'}>
            {title}
          </Text>
          {fieldSet.map(
            ({ label, fieldName, component, name, placeholder }) => {
              return (
                <form.Field
                  key={placeholder}
                  name={name.toString()}
                  children={(field) => (
                    <>
                      {fieldName && label && (
                        <InputLabel>{fieldName}</InputLabel>
                      )}
                      {component ? (
                        component(
                          field,
                          {
                            fieldName,
                            name,
                            label,
                            placeholder,
                          },
                          {
                            id: field.name,
                            name: field.name,
                            value: field.state.value,
                            onChange: (e) => {
                              field.handleChange(e.target.value);
                            },
                            onBlur: field.handleBlur,
                          }
                        )
                      ) : (
                        <TextInput
                          key={field.name}
                          w="inherit"
                          id={field.name}
                          name={field.name}
                          value={field.state.value as string}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            field.handleChange(e.target.value);
                          }}
                          placeholder={placeholder}
                        />
                      )}
                    </>
                  )}
                />
              );
            }
          )}
        </Flex>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <CustomMantineButton
              w={'inherit'}
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? <Loader /> : (buttonLabel ?? 'Submit')}
            </CustomMantineButton>
          )}
        />
      </Flex>
    </form>
  );
};
