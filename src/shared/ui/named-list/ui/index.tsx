import { factory, Text, type StackProps } from '@mantine/core';
import { RoundedContainerStack } from '../../boxes';
import { upperCase } from 'lodash';

interface NamedListProps extends StackProps {
  title: string;
}
export const NamedList = factory<{
  props: NamedListProps;
  ref: HTMLDivElement;
}>(({ title, children, ...props }, ref) => {
  
  return (
    <RoundedContainerStack {...props} ref={ref}>
      <Text fw={800} size="sm" c="dimmed">
        {upperCase(title)}
      </Text>
      {children}
    </RoundedContainerStack>
  );
});
