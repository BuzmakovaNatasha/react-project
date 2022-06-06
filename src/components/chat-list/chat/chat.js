import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";

const ListItemStyles = styled(ListItem)`
  &.Mui-selected {
    backgroung-color: #2b5278;
  }
  &.Mui-selected:hover {
    backgroung-color: #2b5278;
  }
`;

export function Chat({ chat, selected }) {
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
    <ListItemStyles button={true} selected={selected}>
      <ListItem alignItems="flex-start">
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
    </ListItemStyles>
  );
}
