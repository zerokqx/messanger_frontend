import { useLoaderData } from '@tanstack/react-router';



export const useUserFromRouteLoader = () => {
  const user = useLoaderData({
    from: '/_authorized/y',
    select: (data) => data.user,
  });
  return user;
};
