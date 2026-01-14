import { Flex } from '@mantine/core';
import { CustomMantineButton, type CustomButtonProps } from '../../buttons';

export const NotHaveAccount = ({ ...props }: CustomButtonProps) => {
  return (
    <Flex w={'full'} direction={'column'} align={'center'} justify={'center'}>
      <CustomMantineButton variant="subtle" bdrs={'xl'} {...props}>
        Нету акаунта
      </CustomMantineButton>
    </Flex>
  );
};
