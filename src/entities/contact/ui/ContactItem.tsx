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
      {...{ onClick }}
      w={'100%'}
      component={motion.div}
      whileHover={{}}
    >
      <Grid>
        <Grid.Col span={'content'}>
          <Avatar name={name.name} />
        </Grid.Col>
        <Grid.Col span={'content'}>
          <Stack justify="center" h={'100%'}>
            <Text title={name.format} truncate="end" w={'20ch'}>
              {name.params[1] ?? name.params[0]}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={'auto'}>
          <Group justify="end">
            <ActionIcon
              bdrs={'xl'}
              onClick={() => {
                onRemove?.(user.user_id);
                // void mutateAsync(
                //   {
                //     body: {
                //       user_id: user.user_id,
                //     },
                //   },
                //   {
                //     onSuccess: () => {
                //       successNotify(`Контакт ${name.format} удален`);
                //     },
                //   }
                // );
              }}
              variant="light"
              color="red"
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
