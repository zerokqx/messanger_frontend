import type {
  ProfileData,
  ProfileResponse,
} from '@/shared/api/orval/profile-service/profile-service.schemas';

export const mockCurrentUser: ProfileData = {
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
    public_invite_permission: 1,
    group_invite_permission: 1,
    call_permission: 1,
    auto_delete_after_days: null,
  },
};

export const mockCurrentUserResponse: ProfileResponse = {
  status: 'success',
  data: mockCurrentUser,
};
