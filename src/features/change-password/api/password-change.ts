import { useChangePasswordPasswordChangePost } from '@/shared/api/orval/auth-service/v1-auth/v1-auth';

export const usePasswordChange = () => {
  return useChangePasswordPasswordChangePost();
};
