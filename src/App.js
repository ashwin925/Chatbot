import React, { useState } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";
import Suggestions from "./components/Suggestions";
import BackgroundAnimation from "./components/BackgroundAnimation";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);

  // Function to call the backend API for OpenAI responses
  const fetchAIResponse = async (prompt) => {
    try {
      const response = await fetch("http://localhost:5000/api/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      return data.response; // Return the AI's response
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't process your request at the moment.";
    }
  };

  const handleNewMessage = async (message, isUser) => {
    setMessages([...messages, { text: message, isUser }]);

    // If the message is from the user, fetch the AI response
    if (isUser) {
      const aiResponse = await fetchAIResponse(message); // Call the backend API
      setMessages((prevMessages) => [...prevMessages, { text: aiResponse, isUser: false }]);
    }
  };

  return (
    <Parallax strength={500}>
      <div className="app-container">
        <BackgroundAnimation />
        <Sidebar />
        <main className="main-content">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="main-heading"
          >
            Know more..... and more
          </motion.h1>
          <ChatArea messages={messages} />
          <MessageInput onNewMessage={handleNewMessage} />
          <Suggestions onSuggestionClick={(suggestion) => handleNewMessage(suggestion, true)} />
        </main>
      </div>
    </Parallax>
  );
};

export default App;
