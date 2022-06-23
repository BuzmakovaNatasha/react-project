import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Header } from "./components";
import { ProfilePage, ChatPage, GistsPage } from "./pages";
import { store, persistor } from "./store";
import "./global.scss";

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<ProfilePage />} />
              <Route path="/chat/*" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/gists" element={<GistsPage />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
