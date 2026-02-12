import type { ButtonProps, PolymorphicComponentProps } from '@mantine/core';
import type { AnyFormState } from '@tanstack/react-form';

export interface FormButtonProp
  extends PolymorphicComponentProps<'button', ButtonProps> {
  selector?: (state: AnyFormState) => boolean[];
}

export type FormButtonWithoutSelectorProp = Omit<FormButtonProp, 'selector'>;
