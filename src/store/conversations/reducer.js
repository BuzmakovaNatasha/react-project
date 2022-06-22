import { CREATE_CONVERSATION } from "./types";
import { DELETE_CONVERSATION } from "../types";
import { nanoid } from "nanoid";

const initialState = {
  conversations: [
    { name: "Вася Петров", id: nanoid() },
    { name: "Катя Краснова", id: nanoid() },
    { name: "Таня Морозова", id: nanoid() },
    { name: "Иван Бочкин", id: nanoid() },
    { name: "Витя Смирнов", id: nanoid() },
    { name: "Лена Козлова", id: nanoid() },
  ],
};

export const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case DELETE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversation) => conversation.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
