import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Header from "./container/Header/Header";
import Notes from "./container/Notes/Notes";
import Login from "./container/Login/Login";
import Logout from "./container/Logout/Logout";
import AuthGuard from './components/Authentication/Authentication'
import { NavBarContextProvider } from "./context/NavBarContext";

function App() {

  return (
    <BrowserRouter>
    <NavBarContextProvider >
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthGuard children={Header}> <Header /> </AuthGuard>} />
        <Route path="/notes/:id" element={<AuthGuard children={Notes}><Notes /> </AuthGuard>} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      </NavBarContextProvider>
    </BrowserRouter>
  );
}

export default App;
