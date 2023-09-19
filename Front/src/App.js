import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Header from "./container/Header/Header";
import Notes from "./container/Notes/Notes";
import Login from "./container/Login/Login";
import AuthGuard from './components/Authentication/Authentication'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Route index element={<Header />} />
              <Route path="/notes/:id" element={<Notes />} />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;