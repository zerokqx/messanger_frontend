import type { ButtonProps, PolymorphicComponentProps } from '@mantine/core';

export interface SecondActionProp
  extends Omit<PolymorphicComponentProps<'button', ButtonProps>, 'variant'> {
  title: string;
}
