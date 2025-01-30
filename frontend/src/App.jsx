import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import Homepage from "./Pages/Homepage";

function App() {


  return (
    <>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
