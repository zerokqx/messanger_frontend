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
  fileId: NullUndefined<string>
) => {
  return !userId || !fileId
    ? undefined
    : `${import.meta.env.VITE_API_URL}/v1/storage/avatar/download/${userId}?file_id=${fileId}`;
};
// export const createCacheId = (userId: string, fileId: string) => `${userId}_${fileId}`;
// export async function getOrCacheImage(id: string, url: string) {
//   let item = await db.images.get(id);
//
//   if (!item) {
//     const res = await fetch(url);
//
//     if (!res.ok) {
//       throw new Error('failed to load image');
//     }
//
//     const blob = await res.blob();
//
//     await db.images.put({
//       id,
//       blob,
//       sourceUrl: url,
//     });
//     item = { blob };
//   }
//
//   return item.blob as Blob;
// }
