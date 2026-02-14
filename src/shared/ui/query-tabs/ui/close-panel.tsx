import { ActionIcon, Text, useMantineColorScheme } from '@mantine/core';
import { PanelContainer } from './panel';
import { useApiTabs } from '../model/api-context';
import { ArrowLeft } from 'lucide-react';

interface ClosePanelProps {
  title?: string;
}
export const ClosePanel = ({ title }: ClosePanelProps) => {
  const { colorScheme } = useMantineColorScheme();
  const [api] = useApiTabs();
  return (
    <PanelContainer
      justify="start"
      bg={colorScheme === 'dark' ? 'dark' : 'gray.1'}
    >
      <ActionIcon bdrs={'xl'} variant="light" onClick={api.back}>
        <ArrowLeft />
      </ActionIcon>

      <Text>{title}</Text>
    </PanelContainer>
  );
};
