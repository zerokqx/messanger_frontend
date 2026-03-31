import type { components } from '@/shared/types/v1';
import { toString } from 'lodash';
import type { Stringified, Simplify } from 'type-fest';

type Permissions =
  components['schemas']['api__schemas__me__ProfilePermissionsResponse'];

type RemovedFields =
  | 'allow_server_chats'
  | 'force_auto_delete_messages_in_private'
  | 'max_message_auto_delete_seconds';

type StringifiedFields =
  | 'last_seen_visibility'
  | 'public_invite_permission'
  | 'group_invite_permission'
  | 'call_permission'
  | 'auto_delete_after_days';

export type PermissionsStringify = Simplify<
  Omit<Permissions, StringifiedFields | RemovedFields> &
    Stringified<Pick<Permissions, StringifiedFields>>
>;

export const createPermissions = (
  permission: Permissions
): PermissionsStringify => {
  return {
    is_searchable: permission.is_searchable,
    allow_message_forwarding: permission.allow_message_forwarding,
    allow_messages_from_non_contacts:
      permission.allow_messages_from_non_contacts,
    show_profile_photo_to_non_contacts:
      permission.show_profile_photo_to_non_contacts,
    show_bio_to_non_contacts: permission.show_bio_to_non_contacts,
    show_stories_to_non_contacts: permission.show_stories_to_non_contacts,
    last_seen_visibility: toString(permission.last_seen_visibility),
    public_invite_permission: toString(permission.public_invite_permission),
    group_invite_permission: toString(permission.group_invite_permission),
    call_permission: toString(permission.call_permission),
    auto_delete_after_days: String(permission.auto_delete_after_days),
  };
};


