import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Header from "./container/Header/Header";
import Notes from "./container/Notes/Notes";
import Login from "./container/Login/Login";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
      <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Header />} />
        <Route exact path="/notes/:id" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
