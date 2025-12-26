import { tokenAction, useTokenStore } from '@/shared/token';
import { head } from 'lodash';

export const authHeaderSet = (req: Request, access?: string) => {
  const token = access ?? tokenAction.doGetToken();

  const headers = new Headers(req.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return new Request(req, { headers });
};
