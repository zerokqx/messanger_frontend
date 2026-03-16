import type { RelationshipsFn } from './types';

export const mutalContacts: RelationshipsFn = (relations) => {
  return (
    relations.is_current_user_in_contacts_of_target &&
    relations.is_target_in_contacts_of_current_user
  );
};

export const oneOfTheContacts: RelationshipsFn = (relations) => {
  return (
    relations.is_current_user_in_contacts_of_target ||
    relations.is_target_in_contacts_of_current_user
  );
};
export const notContacts: RelationshipsFn = (relations) => {
  return (
    !relations.is_current_user_in_contacts_of_target &&
    !relations.is_target_in_contacts_of_current_user
  );
};
