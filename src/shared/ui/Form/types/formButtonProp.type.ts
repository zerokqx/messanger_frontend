import type {
  Button,
  ButtonProps,
  PolymorphicComponentProps,
} from '@mantine/core';
import type { AnyFormState } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

export interface FormButtonProp
  extends PolymorphicComponentProps<'button', ButtonProps> {
  selector?: (state: AnyFormState) => boolean[];
}

export type FormButtonWithoutSelectorProp = Omit<FormButtonProp, 'selector'>;
