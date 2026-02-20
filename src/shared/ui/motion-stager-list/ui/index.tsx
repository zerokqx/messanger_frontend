import { Stack, type StackProps } from '@mantine/core';
import type { HTMLMotionProps, MotionProps, Variants } from 'motion/react';
import * as m from 'motion/react-m';
import { type ReactNode } from 'react';

import { useVariantContext, VariantContext } from '../model/variant-context';
import type { VariantsType } from '../model/types';

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const variantsByDefault: VariantsType = {
  item,
  container,
};

type MotionPropsWithoutVariants = Omit<HTMLMotionProps<'div'>, 'variants'>;

interface MotionStagerListPorps {
  stackProps?: StackProps;
  containerProps?: MotionPropsWithoutVariants;
  children?: ReactNode;
  variants?: VariantsType;
}

interface MotionStagerComponent {
  (props: MotionStagerListPorps): ReactNode;
  StagerItem: (props: MotionPropsWithoutVariants) => ReactNode;
}

export const StagerItem: MotionStagerComponent['StagerItem'] = (props) => {
  const [{ item }] = useVariantContext();
  return <m.div variants={item} {...props} />;
};

export const MotionStagerList: MotionStagerComponent = ({
  children,
  stackProps,
  containerProps,
  variants,
}) => {
  const __variants = variants ?? variantsByDefault;

  return (
    <VariantContext initialValue={__variants}>
      <Stack
        {...stackProps}
        renderRoot={(props) => (
          <m.div
            {...props}
            variants={__variants.container}
            initial="hidden"
            animate="visible"
            {...containerProps}
          />
        )}
      >
        {children}
      </Stack>
    </VariantContext>
  );
};

MotionStagerList.StagerItem = StagerItem;
