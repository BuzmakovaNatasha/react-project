import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "../index.module.scss";
import { ChatList, MessageList } from "../components";
import {
  getConversations,
  conversationsSelectorConversations,
} from "../store/conversations";
import { getMessages } from "../store/messages";

export const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const conversations = useSelector(conversationsSelectorConversations);

  useEffect(() => {
    const listener = ({ code }) => {
      if (code === "Escape") {
        navigate("/chat");
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [navigate]);

  useEffect(() => {
    if (!conversations.length) {
      dispatch(getConversations());
      dispatch(getMessages());
    }
  }, [dispatch, conversations]);

  return (
    <div className={styles.all}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.content}>
              <ChatList />
              <h1>Выберите чат...</h1>
            </div>
          }
        />
        <Route
          path=":roomId"
          element={
            <div className={styles.content}>
              <ChatList />
              <MessageList />
            </div>
          }
        />
      </Routes>
    </div>
  );
};
