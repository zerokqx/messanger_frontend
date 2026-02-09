import { useNavigate } from '@tanstack/react-router';

export const useSetUuidForRouter = () => {
  const navigate = useNavigate();
  return async (uuid: string) => {
    await navigate({
      search: (prev) => prev,
      to: `/y/u/${uuid}`,
    });
  };
};
