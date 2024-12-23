import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Userlisting from "./Component/Userlisting";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Login from "./components/Login";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Navigate to="login" />} path="/" />
            <Route path="/user" element={<Userlisting></Userlisting>}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          className="toast-position"
          position="bottom-right"
        ></ToastContainer>
      </div>
    </Provider>
  );
}

export default App;
