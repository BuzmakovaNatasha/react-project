export const conversationsSelector = (state) => {
  return state.conversations.conversations;
};

export const lastMessageSelector = (chat) => (state) => {
  const messages = state.messages.messages[chat.name] ?? [];
  return messages[messages.length - 1];
};
