import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "../index.module.scss";
import { ChatList, MessageList } from "../components";
import { useEffect } from "react";

export const ChatPage = () => {
  const navigate = useNavigate();

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
