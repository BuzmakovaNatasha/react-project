import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import styles from "./message-list.module.scss";
import { Message } from "./message";
import {
  sendMessageWithBot,
  messagesSelector,
  profileSelector,
} from "../../store/messages";

export function MessageList() {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const profile = useSelector(profileSelector);

  const selectorMessages = useMemo(() => messagesSelector(roomId), [roomId]);
  const messages = useSelector(selectorMessages);

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const inputRef = useRef();
  const messagesRef = useRef();

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const send = useCallback(
    (message, author = `${profile.firstName} ${profile.lastName}`) => {
      if (message) {
        dispatch(sendMessageWithBot(roomId, profile, { message, author }));
        if (author === `${profile.firstName} ${profile.lastName}`) {
          // проверка для того, чтобы поле ввода не очищалось, если ответил бот, а в поле ввода уже что-то успели написать
          setValue(""); // очищаем поле ввода
        }
      }
    },
    [profile, dispatch, roomId]
  );

  const handlePressInput = ({ code }) => {
    if (code === "Enter" || code === "NumpadEnter") {
      send(value);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chat}>
        {messages.map((message) => (
          <Message message={message} key={message.id} roomId={roomId} />
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
                  send(value);
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
