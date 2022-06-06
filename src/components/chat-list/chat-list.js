import * as React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import List from "@mui/material/List";
import { Link, useParams } from "react-router-dom";
import { Chat } from "./chat";
import styles from "./chat-list.module.scss";

export function ChatList() {
  const { roomId } = useParams();

  const [chats] = useState([
    { name: "Вася Петров", id: nanoid(), text: "Привет!" },
    { name: "Катя Краснова", id: nanoid(), text: "Добрый день!" },
    { name: "Таня Морозова", id: nanoid(), text: "Как дела?" },
    { name: "Иван Бочкин", id: nanoid(), text: "Жизнь прекрасна!" },
    { name: "Витя Смирнов", id: nanoid(), text: "Hello!!!" },
    { name: "Лена Козлова", id: nanoid(), text: "До свидания." },
  ]);

  return (
    <div className={styles.padding}>
      <List>
        {chats.map((chat) => (
          <Link key={chat.id} to={`/chat/${chat.name}`}>
            <Chat chat={chat} selected={roomId === chat.name} />
          </Link>
        ))}
      </List>
    </div>
  );
}
