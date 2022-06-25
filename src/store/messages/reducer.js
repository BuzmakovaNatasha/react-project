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
// import { DELETE_CONVERSATION } from "../types";
// import { nanoid } from "nanoid";

const initialState = {
  messages: {},
  pending: false,
  error: null,
  pendingCreate: false,
  errorCreate: null,
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SEND_MESSAGE:
    //   return {
    //     ...state,
    //     messages: {
    //       ...state.messages,
    //       [action.payload.roomId]: [
    //         ...(state.messages[action.payload.roomId] ?? []),
    //         {
    //           ...action.payload.message,
    //           id: nanoid(),
    //           date: new Date().getTime(),
    //         },
    //       ],
    //     },
    //   };
    // case DELETE_MESSAGE:
    //   return {
    //     ...state,
    //     messages: {
    //       ...state.messages,
    //       [action.payload.roomId]: state.messages[action.payload.roomId].filter(
    //         (message) => message.id !== action.payload.messageId
    //       ),
    //     },
    //   };
    // case DELETE_CONVERSATION:
    //   delete state.messages[action.payload.name];
    //   return {
    //     ...state,
    //   };

    case GET_MESSAGES_START:
      return { ...state, pending: true, error: null };
    case GET_MESSAGES_SUCCESS:
      return { ...state, pending: false, messages: action.payload };
    case GET_MESSAGES_ERROR:
      return { ...state, pending: false, error: action.payload };

    case CREATE_MESSAGE_START:
      return { ...state, pendingCreate: true, errorCreate: null };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        pendingCreate: false,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...(state.messages[action.payload.roomId] ?? []),
            {
              ...action.payload.message,
            },
          ],
        },
      };
    case CREATE_MESSAGE_ERROR:
      return { ...state, pendingCreate: false, errorCreate: action.payload };

    case REMOVE_MESSAGE_START:
      return { ...state };
    case REMOVE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: state.messages[action.payload.roomId].filter(          
            (message) => message.id !== action.payload.messageId
          ),
        },
      };
    case REMOVE_MESSAGE_ERROR:
      return { ...state };
    default:
      return state;
  }
};
