import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import 'normalize.css'
import NavBar from "./components/NavBar/NavBar";
import Header from "./container/Header/Header";
import Notes from "./container/Notes/Notes";
import Login from "./container/Login/Login";
import Register from "./container/Register/Register"
import Logout from "./container/Logout/Logout";
import AuthGuard from './components/Authentication/Authentication'
import Warning from "./components/Warning/Warning";
import ChangeUserPassword from "./container/ChangePassword/ChangePassword";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AuthGuard children={Header}> <NavBar /> <Header /> </AuthGuard>} />
          <Route path="/notes/:id" element={<AuthGuard children={Notes}><NavBar /> <Notes /> </AuthGuard>} />
          <Route path="/register" element={ <Register />} />
          <Route path="/changePassword" element={<ChangeUserPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/warning" element={<Warning />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
