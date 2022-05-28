import * as React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from "./chat-list.module.scss";

export function ChatList() {
  const [chats, setChats] = useState([]);

  const sendChats = () => {
    setChats([
      ...chats,
      { name: "Вася Петров", id: nanoid(), text: "Привет!" },
      { name: "Катя Краснова", id: nanoid(), text: "Добрый день!" },
      { name: "Таня Морозова", id: nanoid(), text: "Как дела?" },
      { name: "Иван Бочкин", id: nanoid(), text: "Жизнь прекрасна!" },
      { name: "Витя Смирнов", id: nanoid(), text: "Hello!!!" },
      { name: "Лена Козлова", id: nanoid(), text: "До свидания." },
    ]);
  };

  useEffect(() => {
    sendChats();
  }, []);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div className={styles.padding}>
      <List>
        {chats.map((chat) => (
          <ListItem alignItems="flex-start" key={chat.id}>
            <ListItemAvatar>
              <Avatar {...stringAvatar(chat.name)} />
            </ListItemAvatar>
            <ListItemText
              primary={chat.name}
              secondary={
                <React.Fragment>
                  {chat.name}: {chat.text}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
