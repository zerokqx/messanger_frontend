import { useIsAuth } from '@/entities/session';
import { useLogout } from '@/entities/user';
import { Stack, Text, Title, Button, Paper, Group } from '@mantine/core';
import type { ErrorRouteComponent } from '@tanstack/react-router';
import { RefreshCcw, Home, LogOut } from 'lucide-react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

export const PageError: ErrorRouteComponent = ({ error, reset }) => {
  const isAuth = useIsAuth();
  const logout = useLogout();
  const [t] = useTranslation(['errors-boundary', 'titles']);
  return (
    <Stack
      h="100vh"
      align="center"
      justify="center"
      p="md"
      key={'error'}
      renderRoot={(props) => (
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          {...props}
        />
      )}
    >
      <Paper withBorder shadow="md" radius="lg" p="xl" maw={420} w="100%">
        <Stack align="center" gap="sm" ta="center">
          <Title size={64} c="red.6" fw={900}>
            {t('titles:error')}
          </Title>

          <Title order={3}>{error.message || t('errors-boundary:unknown-error')}</Title>

          <Text size="sm" c="dimmed">
            {t('errors-boundary:description')}
          </Text>

          <Group justify="center" mt="md">
            <Button
              variant="light"
              leftSection={<RefreshCcw size={16} />}
              onClick={reset}
            >
              {t('errors-boundary:retry')}
            </Button>

            <Button
              variant="subtle"
              leftSection={<Home size={16} />}
              component="a"
              href="/"
            >
              {t('errors-boundary:go-home')}
            </Button>
          </Group>

          {isAuth && (
            <Button
              onClick={logout}
              variant="subtle"
              color="red"
              leftSection={<LogOut />}
            >
              {t('errors-boundary:logout')}
            </Button>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};
