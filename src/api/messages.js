import { child, ref, get, push, remove } from "firebase/database";
import { nanoid } from "nanoid";
import { database } from "./firebase";

export const getMessagesApi = () => {
  return get(child(ref(database), "messages"));
};

export const createMessageApi = (roomId, profile, message) => {
  message.id = nanoid();
  message.date = new Date().getTime();
  return push(child(ref(database), `messages/${roomId}`), message);
};

export const removeMessageApi = (roomId, messageId) => {
  return remove(child(ref(database), `messages/${roomId}`), messageId);
};
