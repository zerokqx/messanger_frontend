import type { paths } from '@/shared/types/v1';
import type { GridProps } from '@mantine/core';

export interface ContactElementProp {
  user:
    | paths['/contact/list']['get']['responses']['200']['content']['application/json']['data']['items'][number]
    | undefined;
  onClick?: GridProps['onClick'];
}
