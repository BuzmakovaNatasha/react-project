import {
  // SEND_MESSAGE,
  // DELETE_MESSAGE,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  CREATE_MESSAGE_START,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_ERROR,
  REMOVE_MESSAGE_START,
  REMOVE_MESSAGE_SUCCESS,
  REMOVE_MESSAGE_ERROR,
} from "./types";

// export const sendMessage = (roomId, profile, message) => {
//   return { type: SEND_MESSAGE, payload: { roomId, profile, message } };
// };

// export const deleteMessage = (roomId, messageId) => {
//   return { type: DELETE_MESSAGE, payload: { roomId, messageId } };
// };

export const getMessagesStart = () => ({
  type: GET_MESSAGES_START,
});

export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
});

export const getMessagesError = (error) => ({
  type: GET_MESSAGES_ERROR,
  payload: error,
});

export const createMessageStart = () => ({
  type: CREATE_MESSAGE_START,
});

export const createMessageSuccess = (roomId, profile, message) => ({
  type: CREATE_MESSAGE_SUCCESS,
  payload: { roomId, profile, message },
});

export const createMessageError = (error) => ({
  type: CREATE_MESSAGE_ERROR,
  payload: error,
});

export const removeMessageStart = () => ({
  type: REMOVE_MESSAGE_START,
});

export const removeMessageSuccess = (roomId, messageId) => ({
  type: REMOVE_MESSAGE_SUCCESS,
  payload: { roomId, messageId },
});

export const removeMessageError = (error) => ({
  type: REMOVE_MESSAGE_ERROR,
  payload: error,
});
