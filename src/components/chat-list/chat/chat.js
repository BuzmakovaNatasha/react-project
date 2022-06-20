import * as React from "react";
import { useMemo } from "react";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import styles from "./chat.module.scss";
import { lastMessageSelector } from "../../../store/conversations";

const ListItemStyles = styled(ListItem)`
  &.Mui-selected {
    backgroung-color: #2b5278;
  }
  &.Mui-selected:hover {
    backgroung-color: #2b5278;
  }
`;

export function Chat({ chat, selected, deleteConversationByName }) {
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
    let initials = "";
    if (name.split(" ").length > 1) {
      initials = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
    } else {
      initials = `${name.split(" ")[0][0]}`;
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }

  // const { roomId } = useParams();

  const selectorLastMessage = useMemo(() => lastMessageSelector(chat), [chat]);

  const lastMessage = useSelector(selectorLastMessage);

  return (
    <ListItemStyles button={true} selected={selected}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar {...stringAvatar(chat.name)} />
        </ListItemAvatar>
        <ListItemText
          primary={chat.name}
          secondary={
            lastMessage && `${lastMessage.author}: ${lastMessage.message}`
          }
        />
        <IconButton
          aria-label="delete"
          size="small"
          onClick={(event) => {
            deleteConversationByName(chat.id, chat.name, event);
          }}
        >
          <DeleteIcon className={styles.deleteIcon} fontSize="inherit" />
        </IconButton>
      </ListItem>
    </ListItemStyles>
  );
}
