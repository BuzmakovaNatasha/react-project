import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { onAuthStateChanged } from "firebase/auth";
import { Header, PrivateRoute, PublicRoute } from "./components";
import {
  ProfilePage,
  ChatPage,
  GistsPage,
  SignUpPage,
  LoginPage,
} from "./pages";
import { store, persistor } from "./store";
import { auth } from "./api/firebase";
import "./global.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [session, setSession] = useState(null);

  const isAuth = !!session;

  useEffect(() => {
    // @TODO  перенести в санк
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header session={session} />
            <Routes>
              <Route path="/" element={<h1>Main page</h1>} />
              <Route
                path="/chat/*"
                element={
                  <PrivateRoute isAuth={isAuth}>
                    <ChatPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute isAuth={isAuth}>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/gists"
                element={
                  <PrivateRoute isAuth={isAuth}>
                    <GistsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <PublicRoute isAuth={isAuth}>
                    <SignUpPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute isAuth={isAuth}>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
    },
  },
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
