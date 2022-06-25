import { CREATE_MESSAGE_SUCCESS, createMessage } from "../messages";


export const botMessage = (store) => (next) => (action) => {
  if (
    action.type === CREATE_MESSAGE_SUCCESS &&
    action.payload.message.author ===
      `${action.payload.profile.firstName} ${action.payload.profile.lastName}`
  ) {
    setTimeout(() => {
      store.dispatch(
        createMessage(action.payload.roomId, action.payload.profile, {
          author: action.payload.roomId,
          message: "Hello from bot middleware",
        })
      );
    }, 1500);
  }

  return next(action);
};
