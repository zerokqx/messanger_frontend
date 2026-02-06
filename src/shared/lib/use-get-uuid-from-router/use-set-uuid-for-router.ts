import { useNavigate } from '@tanstack/react-router';

export const useSetUuidForRouter = () => {
  const navigate = useNavigate();
  return async (uuid: string) => {
    await navigate({
      to: `/y/u/${uuid}`,
    });
  };
};
