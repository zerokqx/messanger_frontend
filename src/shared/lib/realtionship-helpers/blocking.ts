import type { RelationshipsFn } from './types';

export const mutalBlocking: RelationshipsFn = (relations) => {
  return (
    relations.is_current_user_in_blacklist_of_target &&
    relations.is_target_user_blocked_by_current_user
  );
};

export const oneOfTheBlocked: RelationshipsFn = (relation) => {
  return (
    relation.is_current_user_in_blacklist_of_target ||
    relation.is_target_user_blocked_by_current_user
  );
};
export const notBlocking: RelationshipsFn = (relations) => {
  return (
    !relations.is_current_user_in_blacklist_of_target &&
    !relations.is_target_user_blocked_by_current_user
  );
};
