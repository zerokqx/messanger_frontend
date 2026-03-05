import { Stack, Skeleton } from '@mantine/core';

function EditProfileSkeleton() {
  return (
    <Stack gap="xs">
      <Skeleton height={18} width={90} radius="sm" />
      <Skeleton height={120} radius="md" />
    </Stack>
  );
}
