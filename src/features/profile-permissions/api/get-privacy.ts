import { useGetMyPrivacyPrivacyMeGet } from '@/shared/api/orval/profile-service-v2/v2-profile/v2-profile';

export const useGetPrivacy = () => {
  return useGetMyPrivacyPrivacyMeGet({
    query: {
      staleTime: Infinity,
    },
  });
};
