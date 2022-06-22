import { CREATE_CONVERSATION } from "./types";
import { DELETE_CONVERSATION } from "../types";

export const createConversation = (conversation) => {
  return { type: CREATE_CONVERSATION, payload: conversation };
};

export const deleteConversation = ({ id, name }) => {
  return {
    type: DELETE_CONVERSATION,
    payload: { id, name },
    meta: {
      delay: 3000,
    },
  };
};
