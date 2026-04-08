import {
  useDownloadAvatarAvatarDownloadUserIdGet,
  useUploadAvatarAvatarUploadPost,
} from '@/shared/api/orval/storage-service/v1-storage/v1-storage';
import type { NullUndefined } from '@/shared/types/utils/null-undefined';

export const useDownloadAvatar = (userId: string, fileId: string) => {
  return useDownloadAvatarAvatarDownloadUserIdGet(
    userId,
    {
      file_id: fileId,
    },
    {
      query: {
        staleTime: 60 * 1000,
        enabled: !!(userId && fileId),
      },
    }
  );
};
export const useUploadAvatar = () => {
  return useUploadAvatarAvatarUploadPost();
};

export const urlAvatar = (
  userId: NullUndefined<string>,
  fileId: NullUndefined<string>,
  version?: 'main' | 'preview' | 'thumbnail'
) => {
  return !userId || !fileId
    ? undefined
    : `${import.meta.env.VITE_API_URL}/v1/storage/avatar/download/${userId}?file_id=${fileId}&version=${version ?? 'main'}`;
};
