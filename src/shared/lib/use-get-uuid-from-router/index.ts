import { useParams } from '@tanstack/react-router';

export const useGetUuidFromRouter = (): string | undefined => {
  return useParams({
    strict: false,
    select(params) {
      return params.uuid;
    },
  });
};
