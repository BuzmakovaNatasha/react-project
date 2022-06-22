import { sendMessage } from "./actions";

export const sendMessageWithBot = (roomId, profile, message) => (dispatch, getState) => {
  dispatch(sendMessage(roomId, profile, message));

  if (message.author === `${profile.firstName} ${profile.lastName}`) {
    setTimeout(() => {
      dispatch(
        sendMessage(roomId, profile, {
          author: roomId,
          message: "Hello from bot thunk",
        })
      );
    }, 2000);
  }
};