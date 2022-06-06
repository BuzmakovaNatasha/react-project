import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import styles from "./message-list.module.scss";
import { Message } from "./message";

export function MessageList() {
  const { roomId } = useParams();

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [messagesList, setMessagesList] = useState({});

  const inputRef = useRef();
  const messagesRef = useRef();

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const sendMessage = useCallback(
    (message, author = "User User") => {
      if (message) {
        setMessagesList((state) => ({
          ...state,
          [roomId]: [
            ...(state[roomId] ?? []),
            {
              author,
              message,
              id: nanoid(),
              date: new Date(),
            },
          ],
        }));
        if (author === "User User") {
          // проверка для того, чтобы поле ввода не очищалось, если ответил бот, а в поле ввода уже что-то успели написать
          setValue(""); // очищаем поле ввода
        }
      }
    },
    [roomId]
  );

  useEffect(() => {
    inputRef.current?.focus();

    const messages = messagesList[roomId] ?? [];

    const lastMessage = messages[messages.length - 1];
    let timerId = null;

    scrollToBottom();

    if (lastMessage?.author === "User User") {
      timerId = setTimeout(() => {
        sendMessage("Hello! I'm a bot. How are you?", roomId);
      }, 1500);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [sendMessage, messagesList, roomId]);

  const handlePressInput = ({ code }) => {
    if (code === "Enter" || code === "NumpadEnter") {
      sendMessage(value);
    }
  };

  const messages = messagesList[roomId] ?? [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.chat}>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
        <div ref={messagesRef} />
      </div>

      <Input
        className={styles.input}
        inputRef={inputRef}
        placeholder="Написать сообщение..."
        value={value}
        onChange={handleChange}
        onKeyDown={handlePressInput}
        fullWidth={true}
        endAdornment={
          <InputAdornment position="end">
            {!value && <Send cursor={"pointer"} />}
            {value && (
              <Send
                onClick={() => {
                  sendMessage(value);
                }}
                color={"primary"}
                cursor={"pointer"}
              />
            )}
          </InputAdornment>
        }
      />
    </div>
  );
}
