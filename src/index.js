import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import "./global.scss";
import styles from "./index.module.scss";
import { ChatList, Header, MessageList } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <MessageList test1={1} test2={{id: 12}} test3={[{id: 12}]} test4={1}/> */}
      <div className={styles.all}>
        <Header />
        <div className={styles.content}>
          <ChatList />
          <MessageList />
        </div>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
