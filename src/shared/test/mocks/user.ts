import type { components } from '@/shared/types/v1';

export const mockCurrentUser: components['schemas']['ProfileData'] = {
  user_id: '8d0f6e7c-12ab-4cd0-a7ea-57b95f7e9a21',
  login: 'test_user',
  full_name: 'Test User',
  bio: 'Mock profile for tests',
  is_verified: false,
  rating: {
    rating: 1200,
    status: 'fine',
  },
  balances: [
    {
      currency: 'stable',
      balance: '100.00',
      display_balance: 100,
    },
  ],
  created_at: '2026-01-01T10:00:00Z',
  avatars: {
    current: {
      file_id: 'avatar-file-id',
      mime: 'image/png',
      size: 12345,
      width: 256,
      height: 256,
      created_at: '2026-01-01T10:00:00Z',
    },
    history: [],
  },
  stories: [],
  profile_permissions: {
    is_searchable: true,
    allow_message_forwarding: true,
    allow_messages_from_non_contacts: false,
    show_profile_photo_to_non_contacts: true,
    last_seen_visibility: 1,
    show_bio_to_non_contacts: true,
    show_stories_to_non_contacts: false,
    allow_server_chats: true,
    public_invite_permission: 1,
    group_invite_permission: 1,
    call_permission: 1,
    force_auto_delete_messages_in_private: false,
    max_message_auto_delete_seconds: null,
    auto_delete_after_days: null,
  },
};

const mockCurrentUserResponse: components['schemas']['ProfileResponse'] = {
  status: 'success',
  data: mockCurrentUser,
};
