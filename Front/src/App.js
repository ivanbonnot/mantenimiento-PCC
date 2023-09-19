import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Header from "./container/Header/Header";
import Notes from "./container/Notes/Notes";
import Login from "./container/Login/Login";
import AuthGuard from './components/Authentication/Authentication'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard children={Header}>
              <Header />
            </AuthGuard>
          }
        />
        <Route path="/notes/:id" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
