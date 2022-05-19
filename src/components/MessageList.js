import React, { useEffect, useState } from "react";
import styles from "./messageList.module.scss";

export function MessageList() {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    if (value) {
      setMessages([...messages, { author: "User", message: value }]);
      setValue(""); // очищаем поле ввода
    }
  };

  useEffect(() => {
    const messageBot = { author: "Bot", message: "Hello! I'm a bot." };
    const lastMessage = messages[messages.length - 1];
    let timerId = null;

    if (lastMessage?.author === "User") {
      timerId = setTimeout(() => {
        setMessages([...messages, messageBot]);
      }, 1500);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <h1>Message List</h1>
      <textarea
        placeholder="Enter a message"
        value={value}
        onChange={handleChange}
      />
      <button onClick={sendMessage}>Send</button>
      <div className={styles.chat}>
        {messages.map((message) => (
          <div>
            <strong>{message.author}: </strong>
            <span>{message.message}</span>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
