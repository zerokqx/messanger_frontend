import { Button, Center, Text } from '@mantine/core';
import type { SecondActionProp } from '../../../types/second-action-prop.type';

export const SecondAction = ({ title, ...props }: SecondActionProp) => {
  return (
    <>
      <Center>
        <Text children={title} />
      </Center>

      <Center>
        <Button variant="transparent" {...props} />
      </Center>
    </>
  );
};
