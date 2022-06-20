import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { nanoid } from "nanoid";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import styles from "./message-list.module.scss";
import { Message } from "./message";
import {
  sendMessage,
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
        dispatch(sendMessage(roomId, { message, author }));
        // setMessagesList((state) => ({
        //   ...state,
        //   [roomId]: [
        //     ...(state[roomId] ?? []),
        //     {
        //       author,
        //       message,
        //       id: nanoid(),
        //       date: new Date(),
        //     },
        //   ],
        // }));
        if (author === `${profile.firstName} ${profile.lastName}`) {
          // проверка для того, чтобы поле ввода не очищалось, если ответил бот, а в поле ввода уже что-то успели написать
          setValue(""); // очищаем поле ввода
        }
      }
    },
    [profile, dispatch, roomId]
  );

  // useEffect(() => {
  //   inputRef.current?.focus();

  //   const lastMessage = messages[messages.length - 1];
  //   let timerId = null;

  //   scrollToBottom();

  //   if (lastMessage?.author === `${profile.firstName} ${profile.lastName}`) {
  //     timerId = setTimeout(() => {
  //       send("Hello! I'm a bot. How are you?", roomId);
  //     }, 1500);
  //   }

  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, [send, messages, roomId, profile]);

  const handlePressInput = ({ code }) => {
    if (code === "Enter" || code === "NumpadEnter") {
      send(value);
    }
  };

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
