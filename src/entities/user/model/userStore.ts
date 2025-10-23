import { createSelectors } from '@/shared/lib/zustand/selectors';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { UserStore } from '../types/userStore.type';

const useUserStoreBase = create<UserStore>()(
  devtools(
    persist(
      (set, _, store) => ({
        user_id: '00000000-0000-0000-0000-000000000000',
        is_verified: false,
        login: 'Anonymous',
        full_name: 'Anonymous',
        bio: '',
        balances: [], // пустой массив WalletBalance
        created_at: new Date().toISOString(),
        stories: [], // пустой массив (тип unknown[])
        profile_permissions: {
          is_searchable: false,
          allow_message_forwarding: false,
          allow_messages_from_non_contacts: false,
          show_profile_photo_to_non_contacts: false,
          last_seen_visibility: 0,
          show_bio_to_non_contacts: false,
          show_stories_to_non_contacts: false,
          allow_server_chats: false,
          public_invite_permission: 0,
          group_invite_permission: 0,
          call_permission: 0,
          force_auto_delete_messages_in_private: false,
          max_message_auto_delete_seconds: null,
          auto_delete_after_days: null,
        },

        clearState() {
          set(store.getInitialState());
        },
        setUser(user) {
          set(() => ({ ...user }));
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
export const useUserStore = createSelectors(useUserStoreBase);
