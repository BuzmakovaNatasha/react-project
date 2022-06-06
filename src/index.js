import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import "./global.scss";
import { ProfilePage, ChatPage } from "./pages"

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
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<ProfilePage/>}/>
          <Route path="/chat/*" element={<ChatPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);