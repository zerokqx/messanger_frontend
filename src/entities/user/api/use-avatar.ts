import {
  useDownloadAvatarDownloadAvatarUserIdGet,
  useUploadAvatarUploadAvatarPost,
} from '@/shared/api/orval/storage-service/v1-storage/v1-storage';
import type { NullUndefined } from '@/shared/types/utils/null-undefined';

export const useDownloadAvatar = (userId: string, fileId: string) => {
  return useDownloadAvatarDownloadAvatarUserIdGet(
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
  return useUploadAvatarUploadAvatarPost();
};

export const urlAvatar = (
  userId: NullUndefined<string>,
  fileId: NullUndefined<string>
) => {
  return !userId || !fileId
    ? undefined
    : `${import.meta.env.VITE_API_URL}/v1/storage/download/avatar/${userId}?file_id=${fileId}`;
};
