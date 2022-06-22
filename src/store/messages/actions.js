import { SEND_MESSAGE, DELETE_MESSAGE } from "./types";

export const sendMessage = (roomId, profile, message) => {
  return { type: SEND_MESSAGE, payload: { roomId, profile, message } };
};

export const deleteMessage = (roomId, messageId) => {
  return { type: DELETE_MESSAGE, payload: { roomId, messageId } };
};
