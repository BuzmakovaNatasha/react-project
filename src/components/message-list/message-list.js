import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
import styles from "./message-list.module.scss";
import { Message } from "./message";

export function MessageList() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [messages, setMessages] = useState([]);

  const messagesRef = useRef();

  const sendMessage = () => {
    if (value) {
      setMessages([
        ...messages,
        { author: "User User", message: value, id: nanoid(), date: new Date() },
      ]);
      setValue(""); // очищаем поле ввода
      // messagesRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: 'nearest' });
    }
  };

  const ref = useRef();

  useEffect(() => {
    ref.current?.focus();
    const messageBot = {
      author: "Bot Bot",
      message: "Hello! I'm a bot. Hello! I'm a bot. Hello! I'm a bot.",
      id: nanoid(),
      date: new Date(),
    };
    const lastMessage = messages[messages.length - 1];
    let timerId = null;
    console.log(messagesRef.current);
    messagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    if (lastMessage?.author === "User User") {
      timerId = setTimeout(() => {
        setMessages([...messages, messageBot]);
      }, 1500);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [messages]);

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chat} ref={messagesRef}>
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>

      <Input
        className={styles.input}
        inputRef={ref}
        placeholder="Написать сообщение..."
        value={value}
        onChange={handleChange}
        onKeyDown={handlePressInput}
        fullWidth={true}
        endAdornment={
          <InputAdornment position="end">
            {!value && <Send onClick={sendMessage} />}
            {value && <Send onClick={sendMessage} color={"primary"} />}
          </InputAdornment>
        }
      />
    </div>
  );
}

// MessageList.propTypes = {
//   test1: PropTypes.number.isRequired,
//   test2: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }).isRequired,
//   test3: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };
