import { Center, Group, Skeleton, Stack } from '@mantine/core';

export const SkeletonProfile = () => {
  return (
    <Stack>
      <Center>
        <Skeleton circle height={90} />
      </Center>
      <Group>
        <Skeleton circle h={30} w={30} />
        <Stack>
          <Skeleton h={10} w={100} />

          <Skeleton h={10} w={70} />
        </Stack>
      </Group>

      <Group>
        <Skeleton circle h={30} w={30} />
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
        <Skeleton circle h={30} w={30} />
        <Skeleton h={10} w={100} />

        <Skeleton h={10} w={70} />
      </Group>

      <Group>
        <Skeleton circle h={30} w={30} />
        <Stack>
          <Skeleton h={10} w={150} />

          <Skeleton h={10} w={70} />
        </Stack>
      </Group>
    </Stack>
  );
};
