import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import 'normalize.css'
import NavBar from "./components/NavBar/NavBar";
import Header from "./container/Header/Header";
import AllPendings from "./container/AllPendings/AllPendings";
import Notes from "./container/Notes/Notes";
import Login from "./container/Login/Login";
import Register from "./container/Register/Register"
import Logout from "./container/Logout/Logout";
import AuthGuard from './components/Authentication/Authentication'
import Warning from "./components/Warning/Warning";
import ChangeUserPassword from "./container/ChangePassword/ChangePassword";
import NoteLoader from "./components/NoteLoader/NoteLoader";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/noteloader" element={<NoteLoader />} />
        <Route exact path="/" element={<AuthGuard children={Header}> <NavBar /> <Header /> </AuthGuard>} />
        <Route exact path="/notes/:id" element={<AuthGuard children={Notes}><NavBar /> <Notes /> </AuthGuard>} />
        <Route exact path="/allnotes" element={<AuthGuard children={Header}> <NavBar /> <AllPendings /> </AuthGuard>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/changepassword" element={<ChangeUserPassword />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/warning" element={<Warning />} />
        <Route exact path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
