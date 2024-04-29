// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Register from "./components/Register";

function App() {
  return (
    <>
    
    <NoteState>
      <Router>
        <Navbar />
        <div className="container">

        <Routes>
          
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/profile" element={<Profile />} ></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
