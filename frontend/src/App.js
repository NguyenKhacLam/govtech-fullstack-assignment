import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AlertComponent from "./components/alert/alert";
import CreatePoll from "./pages/createPoll/createPoll";
import Login from "./pages/login/login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Poll from "./pages/poll/poll";
import Polldetail from "./pages/pollDetail/pollDetail";
import Register from "./pages/register/register";
import { loadUser } from "./redux/actions/auth";
import { LOGOUT } from "./redux/actions/types";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AlertComponent />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Poll />} />
            <Route path="/poll/:pollId" element={<Polldetail />} />
            <Route path="/poll/create" element={<CreatePoll />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
