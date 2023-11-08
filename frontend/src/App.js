import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AlertComponent from "./components/alert/alert";
import NavBar from "./components/appbar/Navbar";
import Login from "./pages/login/login";
import Polldetail from "./pages/poll-detail/poll-detail";
import Poll from "./pages/poll/poll";
import Register from "./pages/register/register";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <AlertComponent />

        <Routes>
          <Route exact path="/" element={<Poll />} />
          <Route exact path="/poll/:id" element={<Polldetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
