import { useDispatch } from "react-redux";
import { format } from "date-fns";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from "./message.module.scss";
import { deleteMessage } from "../../../store/messages";

export const Message = ({ message, roomId }) => {
  const dispatch = useDispatch();

  const date = format(message.date, "yyyy-MM-dd HH:mm:ss");

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

  return (
    <div className={styles.wrapper}>
      <ListItemAvatar>
        <Avatar {...stringAvatar(message.author)} />
      </ListItemAvatar>
      <div className={styles.text}>
        <span>{message.author}: </span>
        <span>{message.message}</span>
        <div className={styles.date}>{date}</div>
      </div>
      <button
        onClick={() => {
          dispatch(deleteMessage(roomId, message.id));
        }}
      >
        X
      </button>
    </div>
  );
};
