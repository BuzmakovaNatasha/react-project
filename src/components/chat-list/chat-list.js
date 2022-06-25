import * as React from "react";
import { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import List from "@mui/material/List";
import { Button } from "@mui/material";
import styles from "./chat-list.module.scss";
import { Chat } from "./chat";
import {
  createConversation,
  deleteConversation,
  conversationsSelector,
} from "../../store/conversations";

export function ChatList() {
  const { conversations, pending } = useSelector(conversationsSelector);

  const { roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createConversationByName = () => {
    const roomName = prompt("Введите название комнаты");
    const isValidName = conversations.find((conversation) => {
      return conversation.name === roomName;
    });

    if (!!roomName && !isValidName) {
      dispatch(createConversation({ name: roomName, id: nanoid() }));
    } else {
      alert("Некорректное название комнаты");
    }
  };

  const deleteConversationByName = useCallback(
    (id, name, event) => {
      event.preventDefault();
      dispatch(deleteConversation({ id, name }));
      navigate("/chat");
    },
    [dispatch, navigate]
  );

  return (
    <div className={styles.padding}>
      <Button onClick={createConversationByName} variant="contained">
        Create room
      </Button>
      <List>
        {pending ? (
          <h1>pending ...</h1>
        ) : (
          conversations.map((chat) => (
            <Link key={chat.id} to={`/chat/${chat.name}`}>
              <Chat
                chat={chat}
                deleteConversationByName={deleteConversationByName}
                selected={roomId === chat.name}
              />
            </Link>
          ))
        )}
      </List>
    </div>
  );
}
