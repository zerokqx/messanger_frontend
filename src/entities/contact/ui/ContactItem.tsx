import {
  ActionIcon,
  Avatar,
  Box,
  darken,
  Grid,
  Group,
  lighten,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Trash } from 'lucide-react';
import { formatLogin } from '@/shared/lib/formaters';
import type { IContactElementProp } from './types/contactItem.interface';
import { motion } from 'motion/react';

export const ContactItem = ({
  user,
  onClick,
  onRemove,
}: IContactElementProp) => {
  const name = formatLogin(user.login, user.custom_name);
  const theme = useMantineTheme();
  return (
    <Box
      bdrs={'xl'}
      bd={theme.other.borders.darkXs}
      p={'md'}
      w={'100%'}
      component={motion.div}
      whileHover={{}}
    >
      <Group wrap="nowrap">
        <Avatar name={name.name} />
        <Text>{name.params[1] ?? name.params[0]}</Text>
        <Group justify="end" w="100%">
          <ActionIcon
            bdrs={'xl'}
            onClick={() => {
              onRemove?.(user.user_id);
            }}
            variant="light"
            color="red"
          >
            <Trash size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
};
