import { useTokenStore } from '@/entities/token';

export const authHeaderSet = (
  req: Request,
  access = useTokenStore.getState().data.access
) => {
  req.headers.set('Authorization', `Bearer ${access}`);
  return req;
};
