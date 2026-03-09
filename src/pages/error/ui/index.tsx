import { useLogout } from '@/entities/user';
import { Stack, Text, Title, Button, Paper, Group } from '@mantine/core';
import type { ErrorRouteComponent } from '@tanstack/react-router';
import { capitalize } from 'lodash';
import { RefreshCcw, Home, LogOut } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';

export const PageError: ErrorRouteComponent = ({ error, reset }) => {
  const logout = useLogout();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <Stack
        h="100vh"
        align="center"
        justify="center"
        p="md"
        key={'error'}
        renderRoot={(props) => (
          <m.div
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            {...props}
          />
        )}
      >
        <Paper withBorder shadow="md" radius="lg" p="xl" maw={420} w="100%">
          <Stack align="center" gap="sm" ta="center">
            <Title size={64} c="red.6" fw={900}>
              Error
            </Title>

            <Title order={3}>
              {capitalize(error.message || 'Something went wrong')}
            </Title>

            <Text size="sm" c="dimmed">
              An unexpected error occurred. Try refreshing the page or go back
              to the home page.
            </Text>

            <Group justify="center" mt="md">
              <Button
                variant="light"
                leftSection={<RefreshCcw size={16} />}
                onClick={reset}
              >
                Try again
              </Button>

              <Button
                variant="subtle"
                leftSection={<Home size={16} />}
                component="a"
                href="/"
              >
                Go home
              </Button>
            </Group>

            <Button
              onClick={logout}
              variant="subtle"
              color="red"
              leftSection={<LogOut />}
            >
              Logout
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </AnimatePresence>
  );
};
