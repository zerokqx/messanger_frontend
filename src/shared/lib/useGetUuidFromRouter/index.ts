import { useParams } from '@tanstack/react-router';

export const useGetUuidFromRouter = () => {
  return useParams({
    strict: false,
    select(params) {
      return params.uuid;
    },
  });
};
