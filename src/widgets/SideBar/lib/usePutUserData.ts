import { useUserStore } from '@/entities/user';

export const usePutUserData = () => {
  const login = useUserStore((s) => s.login);

  const bio = useUserStore((s) => s.bio);
  const fullName = useUserStore((s) => s.full_name);
  return {
    login,
    bio,
    fullName,
  };
};
