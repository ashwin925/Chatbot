import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./components/chatbot";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
