import {
  Button,
  type ButtonProps,
  type DefaultMantineColor,
} from '@mantine/core';
import type { ComponentProps, ReactNode } from 'react';

interface TailObject<T> {
  true?: T;
  false?: T;
}

interface TailButtonProps
  extends Omit<
    ButtonProps & ComponentProps<'button'>,
    'leftSection' | 'color'
  > {
  tail: boolean;
  tailColors?: TailObject<DefaultMantineColor>;
  tailSection?: TailObject<ReactNode>;
  tailVariant?: TailObject<ButtonProps['variant']>;
}

const selectNode = <T,>(
  status: boolean,
  source: TailObject<T>
): T | undefined => {
  return status ? source.true : source.false;
};

export const TailButton = ({
  tailSection,
  variant,
  tailColors,
  tail,
  tailVariant,
  ...props
}: TailButtonProps) => {
  return (
    <Button
      leftSection={tailSection ? selectNode(tail, tailSection) : undefined}
      color={tailColors ? selectNode(tail, tailColors) : undefined}
      variant={tailVariant ? selectNode(tail, tailVariant) : variant}
      {...props}
    />
  );
};
