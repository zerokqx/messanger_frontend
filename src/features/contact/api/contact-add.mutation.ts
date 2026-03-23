import { $userService, type UserService } from '@/shared/api/generated';
import {
  getGetContactCountContactCountGetQueryKey,
  getGetContactsContactListGetQueryKey,
  useAddContactContactAddPost,
} from '@/shared/api/orval/user-service/v1-user/v1-user';
type Count = UserService.components['schemas']['ContactCountResponse'];
type ContactResponse = UserService.components['schemas']['ContactInfoResponse'];

interface MutateContext {
  prevCount?: Count;
}

const contactListFilter = {
  queryKey: ['get', '/contact/list'] as const,
  exact: false,
};
const countOptions = $userService.queryOptions('get', '/contact/count', {});

export const useContactAdd = () => {
  return useAddContactContactAddPost({
    mutation: {
      async onMutate(_variables, context) {
        await Promise.all([
          context.client.cancelQueries({
            queryKey: getGetContactsContactListGetQueryKey(),
          }),
          context.client.cancelQueries({
            queryKey: getGetContactCountContactCountGetQueryKey(),
          }),
        ]);

        const prevCount = context.client.getQueryData<Count>(
          getGetContactCountContactCountGetQueryKey()
        );

        context.client.setQueryData(
          getGetContactCountContactCountGetQueryKey(),
          (old: Count | undefined) => {
            if (!old) return old;

            return {
              ...old,
              data: { count: old.data.count + 1 },
            };
          }
        );

        return { prevCount };
      },
      onError(_error, _variables, onMutateResult, context) {
        if (onMutateResult?.prevCount) {
          context.client.setQueryData(
            getGetContactCountContactCountGetQueryKey(),
            onMutateResult.prevCount
          );
        }
      },
    },
  });
};
