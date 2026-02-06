import { useParams } from '@tanstack/react-router';

export const useGetUuidFromRouter = (): string | undefined => {
  return useParams({
    strict: false,
    select: (params) => {
      if (
        typeof params === 'object' &&
        params !== null &&
        'uuid' in params &&
        typeof (params as { uuid?: unknown }).uuid === 'string'
      ) {
        return (params as { uuid?: string }).uuid;
      }

      return undefined;
    },
  });
};
export { useSetUuidForRouter } from './use-set-uuid-for-router';
