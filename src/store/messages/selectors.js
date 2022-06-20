export const messagesSelector = (roomId) => (state) =>
  state.messages.messages[roomId] ?? [];

export const profileSelector = (state) => state.profile;
