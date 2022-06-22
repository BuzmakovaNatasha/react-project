import { SEND_MESSAGE, sendMessage } from "../messages";

export const botMessage = (store) => (next) => (action) => {
  if (
    action.type === SEND_MESSAGE &&
    action.payload.message.author ===
      `${action.payload.profile.firstName} ${action.payload.profile.lastName}`
  ) {
    setTimeout(() => {
      store.dispatch(
        sendMessage(action.payload.roomId, action.payload.profile, {
          author: action.payload.roomId,
          message: "Hello from bot middleware",
        })
      );
    }, 1500);
  }

  return next(action);
};
