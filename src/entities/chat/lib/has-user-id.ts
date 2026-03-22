export const hasUserId = (chatData: object|null) => {
  if (chatData && 'user_id' in chatData && typeof chatData.user_id === 'string')
    return chatData.user_id;
};
