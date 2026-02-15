import { ActionIcon, Text, useMantineColorScheme } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useTabsApi } from '../model';
import { PanelContainer } from './panel';

interface ClosePanelProps {
  title?: string;
}
export const ClosePanel = ({ title }: ClosePanelProps) => {
  const { colorScheme } = useMantineColorScheme();
  const [api] = useTabsApi();
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
