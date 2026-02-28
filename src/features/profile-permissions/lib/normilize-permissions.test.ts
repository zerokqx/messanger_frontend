import {
  normilizePermissions,
  type PermissionsUnkeyed,
  type ProfilePermissions,
} from './normilize-permissions';
import { describe, expect, test } from 'vitest';

export const profilePermissionsMock: PermissionsUnkeyed = {
  is_searchable: false,
  allow_message_forwarding: false,
  allow_messages_from_non_contacts: false,
  show_profile_photo_to_non_contacts: false,
  show_bio_to_non_contacts: false,
  show_stories_to_non_contacts: false,
  allow_server_chats: false,
  force_auto_delete_messages_in_private: false,

  last_seen_visibility: '0',
  public_invite_permission: '0',
  group_invite_permission: '0',
  call_permission: '0',

  max_message_auto_delete_seconds: 'null',
  auto_delete_after_days: 'null',
};
const expected = {
  is_searchable: false,
  allow_message_forwarding: false,
  allow_messages_from_non_contacts: false,
  show_profile_photo_to_non_contacts: false,
  show_bio_to_non_contacts: false,
  show_stories_to_non_contacts: false,
  allow_server_chats: false,
  force_auto_delete_messages_in_private: false,

  last_seen_visibility: 0,
  public_invite_permission: 0,
  group_invite_permission: 0,
  call_permission: 0,

  max_message_auto_delete_seconds: null,
  auto_delete_after_days: null,
} satisfies ProfilePermissions;
describe('normilizePermissions Тестирование', () => {
  test('Null to string', () => {
    const result = normilizePermissions(profilePermissionsMock);
    expect(result).toStrictEqual(expected);
  });
  test('Идеомпотентность', () => {
    const firstCall = normilizePermissions(profilePermissionsMock);
    expect(firstCall).toStrictEqual(expected);
    Array.from({ length: 10 }).forEach(() => {
      expect(normilizePermissions(profilePermissionsMock)).toStrictEqual(
        firstCall
      );
    });
  });
});
