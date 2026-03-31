import { defineConfig } from 'orval';

const BASE_TARGET_PATH = './src/shared/api/orval';

const targetPath = <T extends string>(
  name: T
): `${typeof BASE_TARGET_PATH}/${T}/${T}.ts` => {
  return `${BASE_TARGET_PATH}/${name}/${name}.ts`;
};

const url = (name: string, version = 'v1'): string => {
  return `/${version}/${name}`;
};

const targetUrl = <T extends string>(
  name: T
): `https://dev.api.yobble.org/docs/openapi/${T}_service` => {
  return `https://dev.api.yobble.org/docs/openapi/${name}_service`;
};

const MUTATOR_CONFIG = {
  path: './src/shared/api/axios-client.ts',
  name: 'customInstance',
};

export default defineConfig({
  'auth-service': {
    input: { target: targetUrl('auth') },
    output: {
      target: targetPath('auth-service'),
      baseUrl: url('auth'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: { mutator: MUTATOR_CONFIG, query: {} },
    },
  },

  'user-service': {
    input: { target: targetUrl('user') },
    output: {
      target: targetPath('user-service'),
      baseUrl: url('user'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: {
        mutator: MUTATOR_CONFIG,
        query: {
          mutationInvalidates: [
            {
              onMutations: [
                'add_contact_contact_add_post',
                'remove_contact_contact_remove_delete',
                'update_contact_contact_update_patch',
              ],
              invalidates: [
                'get_contacts_contact_list_get',
                'get_contact_count_contact_count_get',
              ],
            },
          ],
        },
        operations: {
          get_contacts_contact_list_get: {
            query: {
              useSuspenseInfiniteQuery: true,
              useInfiniteQueryParam: 'offset',
            },
          },
        },
      },
    },
  },

  'profile-service': {
    input: { target: targetUrl('profile') },
    output: {
      target: targetPath('profile-service'),
      baseUrl: url('profile'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',

      override: {
        operations: {
          get_user_profile_by_user_id__user_id__get: {
            query: {
              usePrefetch: true,
            },
          },
        },
        mutator: MUTATOR_CONFIG,

        query: {
          useSuspenseQuery: true,

          mutationInvalidates: [
            {
              onMutations: ['edit_profile_edit_put'],
              invalidates: ['get_my_profile_me_get'],
            },
          ],
        },
      },
    },
  },

  'feed-service': {
    input: { target: targetUrl('feed') },
    output: {
      target: targetPath('feed-service'),
      baseUrl: url('feed'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: { mutator: MUTATOR_CONFIG },
    },
  },

  'chat-private-service': {
    input: { target: targetUrl('chat_private') },
    output: {
      target: targetPath('chat-private-service'),
      baseUrl: url('chat/private'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: {
        mutator: MUTATOR_CONFIG,
        operations: {
          get_list_private_chats_list_get: {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'offset',
            },
          },
          get_private_chat_history_history_get: {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'before_message_id',
              usePrefetch: true,
            },
          },
        },
      },
    },
  },

  'achievement-service': {
    input: { target: targetUrl('achievement') },
    output: {
      target: targetPath('achievement-service'),
      baseUrl: url('achievement'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: {
        mutator: MUTATOR_CONFIG,
      },
    },
  },

  'feedback-service': {
    input: { target: targetUrl('feedback') },
    output: {
      target: targetPath('feedback-service'),
      baseUrl: url('feedback'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: { mutator: MUTATOR_CONFIG },
    },
  },

  'rating-service': {
    input: { target: targetUrl('rating') },
    output: {
      target: targetPath('rating-service'),
      baseUrl: url('rating'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: { mutator: MUTATOR_CONFIG },
    },
  },

  'storage-service': {
    input: { target: targetUrl('storage') },
    output: {
      target: targetPath('storage-service'),
      baseUrl: url('storage'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: { mutator: MUTATOR_CONFIG },
    },
  },

  'call-service': {
    input: { target: targetUrl('call') },
    output: {
      target: targetPath('call-service'),
      baseUrl: url('call'),
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      namingConvention: 'kebab-case',
      override: { mutator: MUTATOR_CONFIG },
    },
  },
});
