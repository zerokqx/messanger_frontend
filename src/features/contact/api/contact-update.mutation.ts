import { makeGetUserById } from '@/entities/user';
import { typedQueryKey } from '@/shared/api';
import { $api } from '@/shared/api/repository/$api';
import { infinityQueryOptimisticUpdate } from '@/shared/lib/infinity-query-optimistic-update';
import { notify } from '@/shared/lib/notifications';
import type { components } from '@/shared/types/v1';
import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type Profile = components['schemas']['ProfileByUserIdData'];
type ContactResponse = components['schemas']['ContactInfoResponse'];

interface MutateContext {
  prevGetById?: Profile;
  prevContactList: [QueryKey, InfiniteData<ContactResponse> | undefined][];
}

const contactOpt = typedQueryKey('get', '/contact/list');
const searchOpt = typedQueryKey('get', '/search');

export const useContactUpdate = () => {
  const { t } = useTranslation(['api-errors']);
  return $api.user.jwt.useMutation('patch', '/contact/update', {
    async onMutate({ body }, context): Promise<MutateContext> {
      const getUserByIdOpt = makeGetUserById(body.user_id);
      await Promise.all([
        context.client.cancelQueries({
          queryKey: contactOpt,
        }),
        context.client.cancelQueries(getUserByIdOpt),
        context.client.cancelQueries({ queryKey: searchOpt }),
      ]);

      const prevGetById = context.client.getQueryData<Profile>(
        getUserByIdOpt.queryKey
      );
      const prevContactList = context.client.getQueriesData<
        InfiniteData<ContactResponse>
      >({ queryKey: contactOpt });

      context.client.setQueryData<Profile>(getUserByIdOpt.queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          custom_name: body.custom_name,
        } satisfies Profile;
      });

      context.client.setQueriesData<InfiniteData<ContactResponse>>(
        {
          queryKey: contactOpt,
        },
        (old) => {
          if (!old) return old;

          return infinityQueryOptimisticUpdate<
            ContactResponse,
            ContactResponse['data']['items'][number]
          >(
            old,
            (page) => page.data.items,
            (item) => item.user_id === body.user_id,
            (draft) => {
              draft.custom_name = body.custom_name;
            }
          );
        }
      );

      return { prevGetById, prevContactList };
    },
    onError(_error, variables, onMutateResult, context) {
      const typedMutateResult = onMutateResult as MutateContext | undefined;

      context.client.setQueryData<Profile>(
        makeGetUserById(variables.body.user_id).queryKey,
        typedMutateResult?.prevGetById
      );
      context.client.setQueriesData(
        { queryKey: contactOpt },
        typedMutateResult?.prevContactList
      );
      notify.error({ message: t('api-errors:contact_update') });
    },
    async onSettled(_data, _error, variables, _onMutateResult, context) {
      await Promise.all([
        context.client.invalidateQueries(
          makeGetUserById(variables.body.user_id)
        ),
        context.client.invalidateQueries({
          queryKey: contactOpt,
        }),
        context.client.invalidateQueries({
          queryKey: searchOpt,
        }),
      ]);
    },
  });
};
