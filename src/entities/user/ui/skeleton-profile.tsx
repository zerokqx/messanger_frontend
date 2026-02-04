import { Center, Group, Skeleton, Stack } from '@mantine/core';

export const SkeletonProfile = () => {
  return (
    <Stack>
      <Center>
        <Skeleton circle height={90} />
      </Center>
      <Group>
        <Stack>
          <Skeleton h={10} w={100} />

          <Skeleton h={10} w={70} />
        </Stack>
      </Group>

      <Group>
        <Stack>
          <Group gap={'xs'}>
            <Skeleton h={10} w={30} />

            <Skeleton h={10} w={30} />

            <Skeleton h={10} w={30} />
          </Group>

          <Skeleton h={10} w={70} />
        </Stack>
      </Group>

      <Group>
        <Skeleton h={10} w={100} />

        <Skeleton h={10} w={70} />
      </Group>

      <Group>
        <Stack>
          <Skeleton h={10} w={150} />

          <Skeleton h={10} w={70} />
        </Stack>
      </Group>
    </Stack>
  );
};
