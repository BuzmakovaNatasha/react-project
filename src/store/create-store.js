import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getPublicGistsApi, getGistsByNameApi } from "../api/gists";
import {
  createConversationApi,
  getConversationsApi,
  removeConversationApi,
} from "../api/conversations";
import {
  createMessageApi,
  getMessagesApi,
  removeMessageApi,
} from "../api/messages";
import { profileReducer } from "./profile";
import { conversationsReducer } from "./conversations";
import { messagesReducer } from "./messages";
import { gistsReducer } from "./gists";
import { logger, timeScheduler, botMessage } from "./middlewares";

const api = {
  getPublicGistsApi,
  getGistsByNameApi,
  createConversationApi,
  getConversationsApi,
  removeConversationApi,
  createMessageApi,
  getMessagesApi,
  removeMessageApi,
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["messages"],
  whitelist: ["profile"],
};

const rootReducer = combineReducers({
  profile: profileReducer,
  conversations: conversationsReducer,
  messages: messagesReducer,
  gists: gistsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument(api),
      logger,
      timeScheduler,
      botMessage
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args
  )
);

export const persistor = persistStore(store);
