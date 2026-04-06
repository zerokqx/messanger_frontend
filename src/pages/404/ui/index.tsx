import {
  Button,
  Center,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import fourOhFourImage from '../assets/404.png';

export const NotFoundError = () => {
  const { t } = useTranslation(['titles']);
  const navigate = useNavigate();

  return (
    <Container size="md" h="100vh">
      <Center h="100%">
        <Stack align="center" gap="xl">
          <Image
            src={fourOhFourImage}
            alt="404"
            maw={400}
            mx="auto"
            radius="md"
          />

          <Stack align="center" gap="xs">
            <Title order={1} size={48}>
              404
            </Title>
            <Title order={2}>{t('titles:not_found_page')}</Title>
            <Text c="dimmed" size="lg" ta="center">
              {t('titles:please_check_address')}
            </Text>
          </Stack>

          <Group>
            <Button
              variant="default"
              leftSection={<ArrowLeft size={16} />}
              onClick={() => navigate({ to: '/' })}
            >
              На главную
            </Button>
            <Button
              leftSection={<Home size={16} />}
              onClick={() => window.history.back()}
            >
              Вернуться назад
            </Button>
          </Group>
        </Stack>
      </Center>
    </Container>
  );
};
