export const mockUser = {
  rating: {
    status: 'unavailable',
    rating: 2.5,
  },

  user_id: '',
  is_verified: false,
  login: '',
  full_name: '',
  bio: '', balances: [],

  created_at: new Date().toISOString(),
  stories: [],
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
};
