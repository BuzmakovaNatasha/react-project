import {
  // sendMessage,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
  createMessageStart,
  createMessageSuccess,
  createMessageError,
  removeMessageStart,
  removeMessageSuccess,
  removeMessageError,
} from "./actions";

export const sendMessageWithBot =
  (roomId, profile, message) => (dispatch, getState) => {
    dispatch(createMessage(roomId, profile, message));

    if (message.author === `${profile.firstName} ${profile.lastName}`) {
      setTimeout(() => {
        dispatch(
          createMessage(roomId, profile, {
            author: roomId,
            message: "Hello from bot thunk",
          })
        );
      }, 2000);
    }
  };

export const getMessages = () => async (dispatch, _, api) => {
  const messages = {};

  try {
    dispatch(getMessagesStart());

    const snapshot = await api.getMessagesApi();

    snapshot.forEach((snap) => {
      messages[snap.key] = Object.values(snap.val());
    });

    dispatch(getMessagesSuccess(messages));
  } catch (e) {
    dispatch(getMessagesError(e));
  }
};

export const createMessage =
  (roomId, profile, message) => async (dispatch, _, api) => {
    try {
      dispatch(createMessageStart());

      await api.createMessageApi(roomId, profile, message);

      dispatch(createMessageSuccess(roomId, profile, message));
    } catch (e) {
      dispatch(createMessageError(e));
    }
  };

export const deleteMessage =
  (roomId, messageId) => async (dispatch, _, api) => {
    try {
      dispatch(removeMessageStart());

      await api.removeMessageApi(roomId, messageId);

      dispatch(removeMessageSuccess(roomId, messageId));
    } catch (e) {
      dispatch(removeMessageError(e));
    }
  };
